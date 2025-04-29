from sqlalchemy import Column, Integer, String, Date, DateTime, Boolean, ForeignKey, Text
from sqlalchemy.orm import relationship
from database.connection import Base
from datetime import datetime

class Staff(Base):
    __tablename__ = "staff"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    birthday = Column(Date, nullable=True)
    gender = Column(String, nullable=True)
    postal_code = Column(String, nullable=True)
    email = Column(String, unique=True, index=True, nullable=False)
    phone = Column(String, nullable=True)
    alt_phone = Column(String, nullable=True)
    username = Column(String, unique=True, index=True, nullable=False)
    password = Column(String, nullable=False)
    rol = Column(String, nullable=False)
    activo = Column(Boolean, default=True)


class Pacientes(Base):
    __tablename__ = "pacientes"

    id_paciente = Column(Integer, primary_key=True, index=True)
    patient_name = Column(String, nullable=False)
    birthday = Column(Date, nullable=False)
    gender = Column(String, nullable=False)
    address = Column(String, nullable=False)
    contact_info = Column(Text, nullable=True)
    payor_type = Column(String, nullable=True)
    physician = Column(String, nullable=True)
    agency_id = Column(Integer, nullable=False)
    nursing_diagnostic = Column(Text, nullable=True)
    urgency_level = Column(String, nullable=True)
    prior_level_of_function = Column(Text, nullable=True)
    homebound = Column(String, nullable=True)
    weight_bearing_status = Column(String, nullable=True)
    reason_for_referral = Column(Text, nullable=True)
    weight = Column(String, nullable=True)
    height = Column(String, nullable=True)
    pmh = Column(Text, nullable=True)
    clinical_grouping = Column(String, nullable=True)
    disciplines_needed = Column(Text, nullable=True)
    activo = Column(Boolean, default=True)

    exercise_assignments = relationship("PacienteExerciseAssignment", back_populates="paciente", primaryjoin="Pacientes.id_paciente == PacienteExerciseAssignment.paciente_id")
    cert_periods = relationship("CertificationPeriod", back_populates="paciente")
    documentos = relationship("Documentos", back_populates="paciente")

class Documentos(Base):
    __tablename__ = "documentos"

    id = Column(Integer, primary_key=True, index=True)
    paciente_id = Column(Integer, ForeignKey("pacientes.id_paciente"), nullable=False)
    file_name = Column(String, nullable=False)
    file_data_base64 = Column(Text, nullable=False)

    paciente = relationship("Pacientes", back_populates="documentos")
    
class CertificationPeriod(Base):
    __tablename__ = "certification_periods"

    id = Column(Integer, primary_key=True, index=True)
    paciente_id = Column(Integer, ForeignKey("pacientes.id_paciente"))
    start_date = Column(Date, nullable=False)
    end_date = Column(Date, nullable=False)
    is_active = Column(Boolean, default=True)

    paciente = relationship("Pacientes", back_populates="cert_periods")


class Exercise(Base):
    __tablename__ = "exercises"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    description = Column(Text, nullable=True)
    image_url = Column(String, nullable=True)
    default_sets = Column(Integer, nullable=True)
    default_reps = Column(Integer, nullable=True)
    default_sessions_per_day = Column(Integer, nullable=True)
    hep_required = Column(Boolean, default=True)
    discipline = Column(String, nullable=False)  
    focus_area = Column(String, nullable=True)  

class PacienteExerciseAssignment(Base):
    __tablename__ = "paciente_exercise_assignments"

    id = Column(Integer, primary_key=True, index=True)
    paciente_id = Column(Integer, ForeignKey("pacientes.id_paciente"), nullable=False)
    exercise_id = Column(Integer, ForeignKey("exercises.id"), nullable=False)
    sets = Column(Integer, nullable=True)
    reps = Column(Integer, nullable=True)
    sessions_per_day = Column(Integer, nullable=True)
    hep_required = Column(Boolean, default=True)

    paciente = relationship("Pacientes", back_populates="exercise_assignments")
    exercise = relationship("Exercise")
