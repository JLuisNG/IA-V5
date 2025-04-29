from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from typing import List
from datetime import datetime, timedelta, date
from database.connection import get_db
from database.models import Staff, Pacientes, CertificationPeriod, Documentos, Exercise, PacienteExerciseAssignment
from schemas import StaffCreate, StaffResponse, PacienteCreate, PacienteResponse, DocumentoCreate, DocumentoResponse, ExerciseCreate, ExerciseResponse, PacienteExerciseAssignmentCreate

router = APIRouter()

@router.post("/staff/", response_model=StaffResponse)
def create_staff(staff: StaffCreate, db: Session = Depends(get_db)):
    existing_email = db.query(Staff).filter(Staff.email == staff.email).first()
    existing_username = db.query(Staff).filter(Staff.username == staff.username).first()

    if existing_email:
        raise HTTPException(status_code=400, detail="Email ya registrado.")
    if existing_username:
        raise HTTPException(status_code=400, detail="Username ya registrado.")
    
    new_staff = Staff(
        name=staff.name,
        birthday=staff.birthday,
        gender=staff.gender,
        postal_code=staff.postal_code,
        email=staff.email,
        phone=staff.phone,
        alt_phone=staff.alt_phone,
        username=staff.username,
        password=staff.password,  # Hasear en un futuro 
        rol=staff.rol
    )
    db.add(new_staff)
    db.commit()
    db.refresh(new_staff)

    return new_staff

@router.post("/pacientes/", response_model=PacienteResponse)
def create_paciente(paciente: PacienteCreate, db: Session = Depends(get_db)):
    existing_paciente = db.query(Pacientes).filter(
        Pacientes.patient_name == paciente.patient_name,
        Pacientes.birthday == paciente.birthday
    ).first()

    if existing_paciente:
        raise HTTPException(status_code=400, detail="Paciente ya registrado.")

    new_paciente = Pacientes(
        patient_name=paciente.patient_name,
        birthday=paciente.birthday,
        gender=paciente.gender,
        address=paciente.address,
        contact_info=paciente.contact_info,
        payor_type=paciente.payor_type,
        physician=paciente.physician,
        agency_id=paciente.agency_id,
        nursing_diagnostic=paciente.nursing_diagnostic,
        urgency_level=paciente.urgency_level,
        prior_level_of_function=paciente.prior_level_of_function,
        homebound=paciente.homebound,
        weight_bearing_status=paciente.weight_bearing_status,
        reason_for_referral=paciente.reason_for_referral,
        weight=paciente.weight,
        height=paciente.height,
        pmh=paciente.pmh,
        clinical_grouping=paciente.clinical_grouping,
        disciplines_needed=paciente.disciplines_needed,
        activo=paciente.activo
    )

    db.add(new_paciente)
    db.commit()
    db.refresh(new_paciente)

    start_date = paciente.initial_cert_start_date
    end_date = start_date + timedelta(days=60)

    cert_period = CertificationPeriod(
        paciente_id=new_paciente.id_paciente,
        start_date=start_date,
        end_date=end_date,
        is_active=True
    )

    db.add(cert_period)
    db.commit()

    return PacienteResponse.model_validate(new_paciente)

@router.post("/documentos/", response_model=DocumentoResponse)
def upload_document(documento: DocumentoCreate, db: Session = Depends(get_db)):
    new_documento = Documentos(
        paciente_id=documento.paciente_id,
        file_name=documento.file_name,
        file_data_base64=documento.file_data_base64
    )
    db.add(new_documento)
    db.commit()
    db.refresh(new_documento)

    return new_documento

@router.post("/exercises/", response_model=ExerciseResponse)
def create_exercise(exercise: ExerciseCreate, db: Session = Depends(get_db)):
    new_exercise = Exercise(**exercise.dict())
    db.add(new_exercise)
    db.commit()
    db.refresh(new_exercise)

    return new_exercise

@router.post("/pacientes/exercises/")
def assign_exercises_to_paciente(assignments: List[PacienteExerciseAssignmentCreate], db: Session = Depends(get_db)):
    for assignment in assignments:
        new_assignment = PacienteExerciseAssignment(
            paciente_id=assignment.paciente_id,
            exercise_id=assignment.exercise_id,
            sets=assignment.sets,
            reps=assignment.reps,
            sessions_per_day=assignment.sessions_per_day,
            hep_required=assignment.hep_required,
        )
        db.add(new_assignment)

    db.commit()
    return {"message": "Ejercicios asignados exitosamente."}

@router.post("/pacientes/{paciente_id}/certification-period")
def create_certification_period(
    paciente_id: int,
    start_date: date,
    db: Session = Depends(get_db)
):
    paciente = db.query(Pacientes).filter(Pacientes.id_paciente == paciente_id).first()

    if not paciente:
        raise HTTPException(status_code=404, detail="Paciente no encontrado.")

    end_date = start_date + timedelta(days=60)

    new_cert = CertificationPeriod(
        paciente_id=paciente_id,
        start_date=start_date,
        end_date=end_date,
        is_active=True
    )

    db.add(new_cert)
    db.commit()
    db.refresh(new_cert)

    return {
        "message": "Nuevo Certification Period creado exitosamente.",
        "certification_period_id": new_cert.id
    }