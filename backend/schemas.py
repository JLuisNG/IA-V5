from pydantic import BaseModel, Field
from typing import Optional, List
from datetime import datetime, date

#/////////////////////////////// STAFF ////////////////////////////////#

class StaffBase(BaseModel):
    name: str
    birthday: Optional[date] = None
    gender: Optional[str] = None
    postal_code: Optional[str] = None
    email: str
    phone: Optional[str] = None
    alt_phone: Optional[str] = None
    username: str
    password: str
    rol: str
    activo: bool

class StaffCreate(StaffBase):
    pass

class StaffUpdate(BaseModel): 
    name: Optional[str] = Field(default=None, description="Nombre del staff")
    birthday: Optional[date] = Field(default=None, description="Fecha de nacimiento")
    gender: Optional[str] = Field(default=None, description="Género")
    postal_code: Optional[str] = Field(default=None, description="Código postal")
    email: Optional[str] = Field(default=None, description="Correo electrónico")
    phone: Optional[str] = Field(default=None, description="Teléfono")
    alt_phone: Optional[str] = Field(default=None, description="Teléfono alterno")
    username: Optional[str] = Field(default=None, description="Usuario")
    password: Optional[str] = Field(default=None, description="Contraseña")
    rol: Optional[str] = Field(default=None, description="Rol")
    activo: Optional[bool] = Field(default=None, description="Activo")

    class Config:
        from_attributes = True

class StaffResponse(StaffBase):
    id: int

    class Config:
        from_attributes = True

#/////////////////////////////// PACIENTES ////////////////////////////////#

class PacienteBase(BaseModel):
    patient_name: str
    birthday: date
    gender: str
    address: str
    contact_info: Optional[List[str]] = []
    payor_type: Optional[str] = None
    physician: Optional[str] = None
    agency_id: int
    nursing_diagnostic: Optional[str] = None
    urgency_level: Optional[str] = None
    prior_level_of_function: Optional[str] = None
    homebound: Optional[bool] = True
    weight_bearing_status: Optional[str] = None
    reason_for_referral: Optional[str] = None
    weight: Optional[str] = None
    height: Optional[str] = None
    pmh: Optional[str] = None
    clinical_grouping: Optional[str] = None
    disciplines_needed: Optional[List[str]] = []
    activo: Optional[bool] = True

class PacienteCreate(PacienteBase):
    initial_cert_start_date: date

class PacienteUpdate(BaseModel):
    patient_name: Optional[str] = None
    birthday: Optional[date] = None
    gender: Optional[str] = None
    address: Optional[str] = None
    contact_info: Optional[List[str]] = None
    payor_type: Optional[str] = None
    physician: Optional[str] = None
    agency_id: Optional[int] = None
    nursing_diagnostic: Optional[str] = None
    urgency_level: Optional[str] = None
    prior_level_of_function: Optional[str] = None
    homebound: Optional[bool] = None
    weight_bearing_status: Optional[str] = None
    reason_for_referral: Optional[str] = None
    weight: Optional[str] = None
    height: Optional[str] = None
    pmh: Optional[str] = None
    clinical_grouping: Optional[str] = None
    disciplines_needed: Optional[List[str]] = None
    activo: Optional[bool] = None

    class Config:
        from_attributes = True

class PacienteResponse(PacienteBase):
    id_paciente: int

    class Config:
        from_attributes = True

#//////////////////////////// DOCUMENTOS //////////////////////////#

class DocumentoBase(BaseModel):
    paciente_id: int
    file_name: str
    file_data_base64: str

class DocumentoCreate(DocumentoBase):
    pass

class DocumentoResponse(DocumentoBase):
    id: int

    class Config:
        from_attributes = True

#//////////////////////////// EJERCICIOS //////////////////////////#

class ExerciseBase(BaseModel):
    name: str
    description: Optional[str] = None
    image_url: Optional[str] = None
    default_sets: Optional[int] = None
    default_reps: Optional[int] = None
    default_sessions_per_day: Optional[int] = None
    hep_required: Optional[bool] = True
    discipline: str  # PT, OT, ST
    focus_area: Optional[str] = None

class ExerciseCreate(ExerciseBase):
    pass

class ExerciseResponse(ExerciseBase):
    id: int

    class Config:
        from_attributes = True

class PacienteExerciseAssignmentBase(BaseModel):
    paciente_id: int
    exercise_id: int
    sets: Optional[int] = None
    reps: Optional[int] = None
    sessions_per_day: Optional[int] = None
    hep_required: Optional[bool] = True

class PacienteExerciseAssignmentCreate(PacienteExerciseAssignmentBase):
    pass

class PacienteExerciseAssignmentResponse(PacienteExerciseAssignmentBase):
    id: int

    class Config:
        from_attributes = True
