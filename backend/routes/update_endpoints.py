from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from typing import Optional
from database.connection import get_db
from database.models import Staff, Pacientes
from schemas import StaffUpdate, StaffResponse, PacienteUpdate, PacienteResponse

router = APIRouter()

@router.put("/staff/{staff_id}")
def editar_staff_info(
    staff_id: int,
    name: Optional[str] = None,
    birthday: Optional[str] = None,  # Puede ser str porque en Swagger no se parsea bien Date
    gender: Optional[str] = None,
    postal_code: Optional[str] = None,
    email: Optional[str] = None,
    phone: Optional[str] = None,
    alt_phone: Optional[str] = None,
    username: Optional[str] = None,
    password: Optional[str] = None,
    rol: Optional[str] = None,
    activo: Optional[bool] = None,
    db: Session = Depends(get_db)
):
    staff_db = db.query(Staff).filter(Staff.id == staff_id).first()

    if not staff_db:
        raise HTTPException(status_code=404, detail="Staff no encontrado.")

    if email:
        existing_email = db.query(Staff).filter(Staff.email == email, Staff.id != staff_id).first()
        if existing_email:
            raise HTTPException(status_code=400, detail="Email ya registrado.")

    if username:
        existing_username = db.query(Staff).filter(Staff.username == username, Staff.id != staff_id).first()
        if existing_username:
            raise HTTPException(status_code=400, detail="Username ya registrado.")

    update_data = {}
    if name: update_data["name"] = name
    if birthday: update_data["birthday"] = birthday
    if gender: update_data["gender"] = gender
    if postal_code: update_data["postal_code"] = postal_code
    if email: update_data["email"] = email
    if phone: update_data["phone"] = phone
    if alt_phone: update_data["alt_phone"] = alt_phone
    if username: update_data["username"] = username
    if password: update_data["password"] = password
    if rol: update_data["rol"] = rol
    if activo is not None: update_data["activo"] = activo

    for key, value in update_data.items():
        setattr(staff_db, key, value)

    db.commit()
    db.refresh(staff_db)

    return {
        "message": "Staff actualizado correctamente.",
        "staff_id": staff_db.id
    }

@router.put("/pacientes/{paciente_id}", response_model=PacienteResponse)
def update_paciente(paciente_id: int, paciente_update: PacienteUpdate, db: Session = Depends(get_db)):
    paciente_db = db.query(Pacientes).filter(Pacientes.id_paciente == paciente_id).first()

    if not paciente_db:
        raise HTTPException(status_code=404, detail="Paciente no encontrado.")

    update_data = paciente_update.dict(exclude_unset=True)

    if "contact_info" in update_data and update_data["contact_info"] is not None:
        update_data["contact_info"] = ",".join(update_data["contact_info"])

    if "disciplines_needed" in update_data and update_data["disciplines_needed"] is not None:
        update_data["disciplines_needed"] = ",".join(update_data["disciplines_needed"])

    for key, value in update_data.items():
        setattr(paciente_db, key, value)

    db.commit()
    db.refresh(paciente_db)

    return paciente_db
