import React, { useState, useEffect } from 'react';
import '../../../../../styles/developer/Patients/InfoPaciente/ScheduleComponent.scss';
import VisitCompletionModal from './NotesAndSign/Evaluation/VisitCompletionModal';

const ScheduleComponent = ({ patient, onUpdateSchedule, certPeriodDates }) => {
  // States for views and data
  const [isCalendarView, setIsCalendarView] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showAddVisitModal, setShowAddVisitModal] = useState(false);
  const [showEditVisitModal, setShowEditVisitModal] = useState(false);
  const [showDeleteConfirmModal, setShowDeleteConfirmModal] = useState(false);
  const [deleteVisitId, setDeleteVisitId] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedVisit, setSelectedVisit] = useState(null);
  const [visits, setVisits] = useState([]);
  const [error, setError] = useState('');
  const [activeFilter, setActiveFilter] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [showCompletionModal, setShowCompletionModal] = useState(false);
  const [completionVisitData, setCompletionVisitData] = useState(null);

  // Form data
  const [formData, setFormData] = useState({
    visitType: '',
    therapist: '',
    date: '',
    time: '',
    notes: '',
    status: 'SCHEDULED',
    missedReason: '',
  });

  // Visit types
  const visitTypes = [
    { id: 'INITIAL', label: 'Initial Eval' },
    { id: 'REGULAR', label: 'Regular therapy session' },
    { id: 'RECERT', label: 'Recertification evaluation' },
    { id: 'DISCHARGE', label: 'Discharge (DC w/o a visit)' },
    { id: 'POST_HOSPITAL', label: 'Post-Hospital Eval' },
    { id: 'REASSESSMENT', label: 'Reassessment' },
    { id: 'SOC_OASIS', label: 'SOC OASIS' },
    { id: 'ROC_OASIS', label: 'ROC OASIS' },
    { id: 'RECERT_OASIS', label: 'ReCert OASIS' },
    { id: 'FOLLOWUP_OASIS', label: 'Follow-Up OASIS' },
    { id: 'DC_OASIS', label: 'DC OASIS' },
    { id: 'SUPERVISION', label: 'Supervision Assessment' },
  ];

  // Visit statuses
  const visitStatus = [
    { id: 'SCHEDULED', label: 'Scheduled', color: '#10b981' },
    { id: 'COMPLETED', label: 'Completed', color: '#3b82f6' },
    { id: 'MISSED', label: 'Missed', color: '#ef4444' },
    { id: 'PENDING', label: 'Pending', color: '#f59e0b' },
    { id: 'CANCELLED', label: 'Cancelled', color: '#64748b' },
  ];

  // Therapist type colors
  const therapistTypeColors = {
    PT: { primary: '#4f46e5', secondary: '#e0e7ff' },
    PTA: { primary: '#6366f1', secondary: '#e0e7ff' },
    OT: { primary: '#0ea5e9', secondary: '#e0f2fe' },
    COTA: { primary: '#38bdf8', secondary: '#e0f2fe' },
    ST: { primary: '#14b8a6', secondary: '#d1fae5' },
    STA: { primary: '#2dd4bf', secondary: '#d1fae5' },
  };

  // Therapists data
  const therapists = [
    { id: 'pt1', name: 'Dr. Michael Chen', type: 'PT' },
    { id: 'pta1', name: 'Maria Gonzalez', type: 'PTA' },
    { id: 'ot1', name: 'Dr. Emily Parker', type: 'OT' },
    { id: 'cota1', name: 'Thomas Smith', type: 'COTA' },
    { id: 'st1', name: 'Dr. Jessica Lee', type: 'ST' },
    { id: 'sta1', name: 'Robert Williams', type: 'STA' },
  ];

  // Simulated API for fetching visits
  const fetchVisits = async (patientId) => {
    // Replace with actual API call
    return new Promise((resolve) => {
      setTimeout(() => {
        // Mock visits data - replace with API response
        const mockVisits = [
          {
            id: 1,
            visitType: 'INITIAL',
            therapist: 'pt1',
            date: '2025-02-11',
            time: '14:15',
            notes: 'Initial evaluation for physical therapy',
            status: 'COMPLETED',
            documents: ['evaluation_form.pdf'],
          },
          {
            id: 2,
            visitType: 'REGULAR',
            therapist: 'pt1',
            date: '2025-02-13',
            time: '15:45',
            notes: 'Follow-up session for gait training',
            status: 'MISSED',
            missedReason: 'Patient was not available',
          },
          {
            id: 3,
            visitType: 'RECERT',
            therapist: 'pt1',
            date: '2025-02-18',
            time: '',
            notes: 'Recertification evaluation for continued therapy',
            status: 'SCHEDULED',
            documents: [],
          },
          {
            id: 4,
            visitType: 'REGULAR',
            therapist: 'pt1',
            date: '2025-02-24',
            time: '15:30',
            notes: 'Regular therapy session',
            status: 'COMPLETED',
            documents: ['progress_note.pdf'],
          },
          {
            id: 5,
            visitType: 'REGULAR',
            therapist: 'pta1',
            date: '2025-02-26',
            time: '14:45',
            notes: 'PTA follow-up session',
            status: 'COMPLETED',
            documents: ['progress_note.pdf'],
          },
          {
            id: 6,
            visitType: 'REGULAR',
            therapist: 'pta1',
            date: '2025-03-04',
            time: '13:45',
            notes: 'PTA follow-up session',
            status: 'COMPLETED',
            documents: ['progress_note.pdf'],
          },
          {
            id: 7,
            visitType: 'REGULAR',
            therapist: 'pta1',
            date: '2025-03-06',
            time: '15:30',
            notes: 'PTA follow-up session',
            status: 'SCHEDULED',
          },
          {
            id: 8,
            visitType: 'REGULAR',
            therapist: 'pta1',
            date: '2025-03-10',
            time: '13:45',
            notes: 'PTA follow-up session',
            status: 'SCHEDULED',
          },
          {
            id: 9,
            visitType: 'REGULAR',
            therapist: 'pta1',
            date: '2025-03-13',
            time: '13:45',
            notes: 'PTA follow-up session',
            status: 'SCHEDULED',
          },
          {
            id: 10,
            visitType: 'REASSESSMENT',
            therapist: 'pt1',
            date: '2025-03-18',
            time: '',
            notes: 'Reassessment for progress evaluation',
            status: 'SCHEDULED',
          },
          {
            id: 11,
            visitType: 'REGULAR',
            therapist: 'pta1',
            date: '2025-03-25',
            time: '',
            notes: 'Regular PTA session',
            status: 'SCHEDULED',
          },
          {
            id: 12,
            visitType: 'REGULAR',
            therapist: 'ot1',
            date: '2025-03-27',
            time: '',
            notes: 'Occupational therapy session',
            status: 'SCHEDULED',
          },
          {
            id: 13,
            visitType: 'REGULAR',
            therapist: 'cota1',
            date: '2025-04-01',
            time: '13:15',
            notes: 'COTA session',
            status: 'PENDING',
            pendingReason: 'Pending cosignature',
          },
          {
            id: 14,
            visitType: 'REGULAR',
            therapist: 'st1',
            date: '2025-04-03',
            time: '14:45',
            notes: 'Speech therapy session',
            status: 'PENDING',
            pendingReason: 'Pending cosignature',
          },
          {
            id: 15,
            visitType: 'REGULAR',
            therapist: 'sta1',
            date: '2025-04-05',
            time: '10:30',
            notes: 'Speech therapy assistant session',
            status: 'SCHEDULED',
          },
        ];
        resolve(mockVisits.filter((visit) => visit.patientId === patientId));
      }, 1000);
    });
  };

  // Fetch visits on component mount
  useEffect(() => {
    const loadVisits = async () => {
      setIsLoading(true);
      try {
        const fetchedVisits = await fetchVisits(patient.id);
        setVisits(fetchedVisits);
      } catch (err) {
        setError('Failed to fetch visits');
      } finally {
        setIsLoading(false);
      }
    };
    loadVisits();
  }, [patient.id]);

  // Simulated API for adding a visit
  const addVisit = async (visitData) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newVisit = {
          id: visits.length > 0 ? Math.max(...visits.map((v) => v.id)) + 1 : 1,
          ...visitData,
          patientId: patient.id,
        };
        resolve(newVisit);
      }, 1000);
    });
  };

  // Simulated API for updating a visit
  const updateVisit = async (visitId, visitData) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const updatedVisit = { ...visitData, id: visitId, patientId: patient.id };
        resolve(updatedVisit);
      }, 1000);
    });
  };

  // Simulated API for deleting a visit
  const deleteVisitApi = async (visitId) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(visitId);
      }, 1000);
    });
  };

  // Show calendar
  const handleShowCalendar = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsCalendarView(true);
      setIsLoading(false);
    }, 1000);
  };

  // Back to visits view
  const handleBackToVisits = () => {
    setIsCalendarView(false);
    setSelectedDate(null);
  };

  // Format date to local ISO string
  const formatDateToLocalISOString = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  // Handle date click in calendar
  const handleDateClick = (date) => {
    setSelectedDate(date);
    setShowAddVisitModal(true);
    setFormData({
      ...formData,
      date: formatDateToLocalISOString(date),
      time: '',
      visitType: '',
      therapist: '',
      notes: '',
      status: 'SCHEDULED',
      missedReason: '',
    });
  };

  // Open edit visit modal
  const handleEditVisit = (visit) => {
    setSelectedVisit(visit);
    setFormData({
      visitType: visit.visitType,
      therapist: visit.therapist,
      date: visit.date,
      time: visit.time || '',
      notes: visit.notes || '',
      status: visit.status,
      missedReason: visit.missedReason || '',
    });
    setShowEditVisitModal(true);
  };

  // Initiate visit deletion
  const handleInitiateDelete = (visitId) => {
    setDeleteVisitId(visitId);
    setShowDeleteConfirmModal(true);
  };

  // Delete a visit
  const handleDeleteVisit = async () => {
    setIsDeleting(true);
    try {
      await deleteVisitApi(deleteVisitId);
      const updatedVisits = visits.filter((visit) => visit.id !== deleteVisitId);
      setVisits(updatedVisits);
      if (onUpdateSchedule) {
        onUpdateSchedule(updatedVisits);
      }
    } catch (err) {
      setError('Failed to delete visit');
    } finally {
      setIsDeleting(false);
      setShowDeleteConfirmModal(false);
      setDeleteVisitId(null);
    }
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    setError('');
  };

  // Check if time slot is available
  const isTimeAvailable = (date, time, therapistId, visitId = null) => {
    const existingVisits = visits.filter(
      (visit) =>
        visit.date === date &&
        visit.time === time &&
        visit.therapist === therapistId &&
        (visitId === null || visit.id !== visitId)
    );
    return existingVisits.length === 0;
  };

  // Save a new visit
  const handleSaveVisit = async () => {
    if (!formData.visitType || !formData.therapist || !formData.date) {
      setError('Please fill in all required fields');
      return;
    }

    if (formData.time && !isTimeAvailable(formData.date, formData.time, formData.therapist)) {
      setError('This time slot is already booked for the selected therapist');
      return;
    }

    // Check if the visit date is within the certification period
    if (certPeriodDates.startDate && certPeriodDates.endDate) {
      const visitDate = new Date(formData.date);
      const startDate = new Date(certPeriodDates.startDate);
      const endDate = new Date(certPeriodDates.endDate);
      if (visitDate < startDate || visitDate > endDate) {
        setError('Visit date must be within the current certification period');
        return;
      }
    }

    setIsLoading(true);
    try {
      const newVisit = await addVisit(formData);
      const updatedVisits = [...visits, newVisit];
      setVisits(updatedVisits);
      if (onUpdateSchedule) {
        onUpdateSchedule(updatedVisits);
      }
      setShowAddVisitModal(false);
      setFormData({
        visitType: '',
        therapist: '',
        date: '',
        time: '',
        notes: '',
        status: 'SCHEDULED',
        missedReason: '',
      });
    } catch (err) {
      setError('Failed to save visit');
    } finally {
      setIsLoading(false);
    }
  };

  // Update an existing visit
  const handleUpdateVisit = async (visit) => {
    setIsLoading(true);
    try {
      // Check if the visit date is within the certification period
      if (certPeriodDates.startDate && certPeriodDates.endDate) {
        const visitDate = new Date(visit.date);
        const startDate = new Date(certPeriodDates.startDate);
        const endDate = new Date(certPeriodDates.endDate);
        if (visitDate < startDate || visitDate > endDate) {
          setError('Visit date must be within the current certification period');
          setIsLoading(false);
          return;
        }
      }

      const isCompletingVisit = visit.status === 'COMPLETED' && selectedVisit.status !== 'COMPLETED';
      const updatedVisit = await updateVisit(selectedVisit.id, visit);
      const updatedVisits = visits.map((v) => (v.id === selectedVisit.id ? updatedVisit : v));
      setVisits(updatedVisits);
      if (onUpdateSchedule) {
        onUpdateSchedule(updatedVisits);
      }

      if (isCompletingVisit) {
        const visitData = updatedVisits.find((v) => v.id === selectedVisit.id);
        setCompletionVisitData(visitData);
        setShowCompletionModal(true);
      }

      setShowEditVisitModal(false);
      setSelectedVisit(null);
      setFormData({
        visitType: '',
        therapist: '',
        date: '',
        time: '',
        notes: '',
        status: 'SCHEDULED',
        missedReason: '',
      });
    } catch (err) {
      setError('Failed to update visit');
    } finally {
      setIsLoading(false);
    }
  };

  // Handle completion form save
  const handleCompletionFormSave = async (formData) => {
    console.log('Saving completion form data:', formData);
    return new Promise((resolve) => {
      setTimeout(() => {
        const updatedVisits = visits.map((visit) =>
          visit.id === completionVisitData.id
            ? {
                ...visit,
                evaluationCompleted: true,
                evaluationData: formData,
              }
            : visit
        );
        setVisits(updatedVisits);
        if (onUpdateSchedule) {
          onUpdateSchedule(updatedVisits);
        }
        resolve();
      }, 2000);
    });
  };

  // Get therapist name by ID
  const getTherapistName = (therapistId) => {
    const therapist = therapists.find((t) => t.id === therapistId);
    return therapist ? therapist.name : 'Unknown';
  };

  // Get therapist type by ID
  const getTherapistType = (therapistId) => {
    const therapist = therapists.find((t) => t.id === therapistId);
    return therapist ? therapist.type : null;
  };

  // Get colors for a specific therapist
  const getTherapistColors = (therapistId) => {
    const therapistType = getTherapistType(therapistId);
    return therapistType && therapistTypeColors[therapistType]
      ? therapistTypeColors[therapistType]
      : { primary: '#64748b', secondary: '#f1f5f9' };
  };

  // Get visit type label by ID
  const getVisitTypeLabel = (typeId) => {
    const type = visitTypes.find((t) => t.id === typeId);
    return type ? type.label : typeId;
  };

  // Get status color by ID
  const getStatusColor = (statusId) => {
    const status = visitStatus.find((s) => s.id === statusId);
    return status ? status.color : '#64748b';
  };

  // Get status label by ID
  const getStatusLabel = (statusId) => {
    const status = visitStatus.find((s) => s.id === statusId);
    return status ? status.label : statusId;
  };

  // Check if visit is within certification period
  const isWithinCertPeriod = (visitDateStr) => {
    if (!certPeriodDates?.startDate || !certPeriodDates?.endDate) return true;
    const visitDate = new Date(visitDateStr);
    const startDate = new Date(certPeriodDates.startDate);
    const endDate = new Date(certPeriodDates.endDate);
    return visitDate >= startDate && visitDate <= endDate;
  };

  // Filter visits based on active filter, search, and certification period
  const getFilteredVisits = () => {
    let filtered = [...visits];

    // Filter by certification period
    filtered = filtered.filter((visit) => isWithinCertPeriod(visit.date));

    // Filter by active status
    if (activeFilter !== 'ALL') {
      filtered = filtered.filter((visit) => visit.status === activeFilter);
    }

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter((visit) => {
        const therapistName = getTherapistName(visit.therapist).toLowerCase();
        const visitType = getVisitTypeLabel(visit.visitType).toLowerCase();
        const notes = (visit.notes || '').toLowerCase();
        return (
          therapistName.includes(query) ||
          visitType.includes(query) ||
          notes.includes(query) ||
          visit.date.includes(query)
        );
      });
    }

    return filtered;
  };

  // Render calendar
  const renderCalendar = () => {
    const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    const lastDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
    const firstDayOfWeek = firstDayOfMonth.getDay();
    const daysArray = [];

    for (let i = 0; i < firstDayOfWeek; i++) {
      daysArray.push(null);
    }

    for (let day = 1; day <= lastDayOfMonth.getDate(); day++) {
      daysArray.push(new Date(currentDate.getFullYear(), currentDate.getMonth(), day));
    }

    const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    const getVisitsForDay = (date) => {
      const dateString = formatDateToLocalISOString(date);
      return visits.filter((visit) => visit.date === dateString && isWithinCertPeriod(visit.date));
    };

    return (
      <div className="schedule-calendar">
        <div className="calendar-header">
          <button
            className="month-nav-btn"
            onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1))}
            aria-label="Previous month"
          >
            <i className="fas fa-chevron-left"></i>
          </button>
          <h3>{currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</h3>
          <button
            className="month-nav-btn"
            onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1))}
            aria-label="Next month"
          >
            <i className="fas fa-chevron-right"></i>
          </button>
        </div>

        <div className="calendar-weekdays">
          {weekDays.map((day, index) => (
            <div key={index} className="weekday">{day}</div>
          ))}
        </div>

        <div className="calendar-days">
          {daysArray.map((day, index) => {
            if (!day) return <div key={index} className="calendar-day empty"></div>;

            const dayVisits = getVisitsForDay(day);
            const today = new Date();
            const isToday =
              day.getDate() === today.getDate() &&
              day.getMonth() === today.getMonth() &&
              day.getFullYear() === today.getFullYear();

            return (
              <div
                key={index}
                className={`calendar-day ${dayVisits.length > 0 ? 'has-visits' : ''} ${isToday ? 'today' : ''}`}
                onClick={() => handleDateClick(day)}
              >
                <div className="day-number">{day.getDate()}</div>

                {dayVisits.length > 0 && (
                  <div className="day-visits-preview">
                    {dayVisits.slice(0, 3).map((visit, vIndex) => {
                      const therapistColors = getTherapistColors(visit.therapist);
                      return (
                        <div
                          key={vIndex}
                          className="calendar-visit-pill"
                          style={{
                            backgroundColor: therapistColors.secondary,
                            borderLeft: `3px solid ${therapistColors.primary}`,
                          }}
                        >
                          <span className="visit-time">{visit.time ? formatTime(visit.time) : '—'}</span>
                          <span className="visit-title" style={{ color: therapistColors.primary }}>
                            {getVisitTypeLabel(visit.visitType).substring(0, 15)}
                            {getVisitTypeLabel(visit.visitType).length > 15 ? '...' : ''}
                          </span>
                        </div>
                      );
                    })}

                    {dayVisits.length > 3 && (
                      <div className="more-visits">+{dayVisits.length - 3} more</div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  // Render visit card
  const renderVisitCard = (visit) => {
    const therapistColors = getTherapistColors(visit.therapist);
    const statusColor = getStatusColor(visit.status);
    const therapistType = getTherapistType(visit.therapist);

    const [year, month, day] = visit.date.split('-').map(Number);
    const visitDate = new Date(year, month - 1, day);

    return (
      <div
        className="visit-card"
        key={visit.id}
        style={{
          borderTopColor: therapistColors.primary,
          borderTopWidth: '4px',
        }}
      >
        <div
          className="visit-card-header"
          style={{
            backgroundColor: therapistColors.secondary,
            color: therapistColors.primary,
          }}
        >
          <div className="visit-type">{getVisitTypeLabel(visit.visitType)}</div>
          <div
            className="visit-status"
            style={{
              backgroundColor: statusColor,
              color: 'white',
            }}
          >
            {getStatusLabel(visit.status)}
          </div>
        </div>

        <div className="visit-card-body">
          <div className="visit-date-time">
            <i className="fas fa-calendar"></i>
            <div className="date-time-details">
              <span className="visit-date">
                {visitDate.toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: '2-digit',
                  day: '2-digit',
                })}
              </span>
              {visit.time && <span className="visit-time">{formatTime(visit.time)}</span>}
            </div>
          </div>

          <div className="visit-therapist">
            <div
              className="therapist-icon"
              style={{ backgroundColor: therapistColors.primary }}
            >
              {therapistType}
            </div>
            <span>{getTherapistName(visit.therapist)}</span>
          </div>

          {visit.notes && (
            <div className="visit-notes">
              <i className="fas fa-sticky-note"></i>
              <span>{visit.notes}</span>
            </div>
          )}

          {visit.missedReason && (
            <div className="visit-missed-reason">
              <i className="fas fa-exclamation-circle"></i>
              <span>{visit.missedReason}</span>
            </div>
          )}

          {visit.documents && visit.documents.length > 0 && (
            <div className="visit-documents">
              <i className="fas fa-file-alt"></i>
              <span>
                {visit.documents.length} {visit.documents.length === 1 ? 'Document' : 'Documents'}
              </span>
            </div>
          )}
        </div>

        <div className="visit-card-actions">
          <button
            className="edit-btn"
            onClick={() => handleEditVisit(visit)}
            aria-label="Edit visit"
          >
            <i className="fas fa-edit"></i>
          </button>
          <button
            className="delete-btn"
            onClick={() => handleInitiateDelete(visit.id)}
            aria-label="Delete visit"
          >
            <i className="fas fa-trash"></i>
          </button>
        </div>
      </div>
    );
  };

  // Format time
  const formatTime = (timeString) => {
    if (!timeString) return '';
    const [hours, minutes] = timeString.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const hour12 = hour % 12 || 12;
    return `${hour12}:${minutes} ${ampm}`;
  };

  // Group visits by month
  const groupVisitsByMonth = () => {
    const filtered = getFilteredVisits();
    const grouped = {};

    filtered.forEach((visit) => {
      const date = new Date(visit.date);
      const monthYear = date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

      if (!grouped[monthYear]) {
        grouped[monthYear] = [];
      }

      grouped[monthYear].push(visit);
    });

    Object.keys(grouped).forEach((month) => {
      grouped[month].sort((a, b) => new Date(a.date) - new Date(b.date));
    });

    return grouped;
  };

  // Render add visit modal
  const renderAddVisitModal = () => {
    return (
      <div className="modal-overlay">
        <div className="modal-content">
          <div className="modal-header">
            <h3>Schedule New Visit</h3>
            <button className="close-btn" onClick={() => setShowAddVisitModal(false)}>
              <i className="fas fa-times"></i>
            </button>
          </div>

          <div className="modal-body">
            {error && <div className="error-message">{error}</div>}

            <div className="form-group">
              <label>Visit Type</label>
              <select
                name="visitType"
                value={formData.visitType}
                onChange={handleInputChange}
                className="form-input"
              >
                <option value="">Select visit type</option>
                {visitTypes.map((type) => (
                  <option key={type.id} value={type.id}>{type.label}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>Therapist</label>
              <select
                name="therapist"
                value={formData.therapist}
                onChange={handleInputChange}
                className="form-input"
              >
                <option value="">Select therapist</option>
                {therapists.map((therapist) => (
                  <option key={therapist.id} value={therapist.id}>
                    {therapist.name} ({therapist.type})
                  </option>
                ))}
              </select>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Date</label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleInputChange}
                  className="form-input"
                  min={certPeriodDates.startDate || undefined}
                  max={certPeriodDates.endDate || undefined}
                />
              </div>

              <div className="form-group">
                <label>Time</label>
                <input
                  type="time"
                  name="time"
                  value={formData.time}
                  onChange={handleInputChange}
                  className="form-input"
                />
              </div>
            </div>

            <div className="form-group">
              <label>Status</label>
              <select
                name="status"
                value={formData.status}
                onChange={handleInputChange}
                className="form-input"
              >
                {visitStatus.map((status) => (
                  <option key={status.id} value={status.id}>{status.label}</option>
                ))}
              </select>
            </div>

            {formData.status === 'MISSED' && (
              <div className="form-group">
                <label>Reason for Missing</label>
                <input
                  type="text"
                  name="missedReason"
                  value={formData.missedReason}
                  onChange={handleInputChange}
                  placeholder="Enter reason"
                  className="form-input"
                />
              </div>
            )}

            <div className="form-group">
              <label>Notes</label>
              <textarea
                name="notes"
                value={formData.notes}
                onChange={handleInputChange}
                placeholder="Add visit notes"
                className="form-input"
                rows="3"
              ></textarea>
            </div>
          </div>

          <div className="modal-footer">
            <button
              className="cancel-btn"
              onClick={() => setShowAddVisitModal(false)}
            >
              Cancel
            </button>
            <button
              className="save-btn"
              onClick={handleSaveVisit}
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="btn-loading">
                  <i className="fas fa-spinner fa-spin"></i> Saving...
                </span>
              ) : (
                'Save Visit'
              )}
            </button>
          </div>
        </div>
      </div>
    );
  };

  // Render edit visit modal
  const renderEditVisitModal = () => {
    return (
      <div className="modal-overlay">
        <div className="modal-content">
          <div className="modal-header">
            <h3>Edit Visit</h3>
            <button className="close-btn" onClick={() => setShowEditVisitModal(false)}>
              <i className="fas fa-times"></i>
            </button>
          </div>

          <div className="modal-body">
            {error && <div className="error-message">{error}</div>}

            <div className="form-group">
              <label>Visit Type</label>
              <select
                name="visitType"
                value={formData.visitType}
                onChange={handleInputChange}
                className="form-input"
              >
                <option value="">Select visit type</option>
                {visitTypes.map((type) => (
                  <option key={type.id} value={type.id}>{type.label}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>Therapist</label>
              <select
                name="therapist"
                value={formData.therapist}
                onChange={handleInputChange}
                className="form-input"
              >
                <option value="">Select therapist</option>
                {therapists.map((therapist) => (
                  <option key={therapist.id} value={therapist.id}>
                    {therapist.name} ({therapist.type})
                  </option>
                ))}
              </select>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Date</label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleInputChange}
                  className="form-input"
                  min={certPeriodDates.startDate || undefined}
                  max={certPeriodDates.endDate || undefined}
                />
              </div>

              <div className="form-group">
                <label>Time</label>
                <input
                  type="time"
                  name="time"
                  value={formData.time}
                  onChange={handleInputChange}
                  className="form-input"
                />
              </div>
            </div>

            <div className="form-group">
              <label>Status</label>
              <select
                name="status"
                value={formData.status}
                onChange={handleInputChange}
                className="form-input"
              >
                {visitStatus.map((status) => (
                  <option key={status.id} value={status.id}>{status.label}</option>
                ))}
              </select>
            </div>

            {formData.status === 'MISSED' && (
              <div className="form-group">
                <label>Reason for Missing</label>
                <input
                  type="text"
                  name="missedReason"
                  value={formData.missedReason}
                  onChange={handleInputChange}
                  placeholder="Enter reason"
                  className="form-input"
                />
              </div>
            )}

            <div className="form-group">
              <label>Notes</label>
              <textarea
                name="notes"
                value={formData.notes}
                onChange={handleInputChange}
                placeholder="Add visit notes"
                className="form-input"
                rows="3"
              ></textarea>
            </div>
          </div>

          <div className="modal-footer">
            <button
              className="cancel-btn"
              onClick={() => setShowEditVisitModal(false)}
            >
              Cancel
            </button>
            <button
              className="save-btn"
              onClick={() => handleUpdateVisit(formData)}
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="btn-loading">
                  <i className="fas fa-spinner fa-spin"></i> Updating...
                </span>
              ) : (
                'Update Visit'
              )}
            </button>
          </div>
        </div>
      </div>
    );
  };

  // Render delete confirmation modal
  const renderDeleteConfirmModal = () => {
    const visit = visits.find((v) => v.id === deleteVisitId);
    if (!visit) return null;

    const visitDate = new Date(visit.date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });

    return (
      <div className="modal-overlay">
        <div className="modal-content delete-confirm-modal">
          <div className="modal-header delete-header">
            <h3>Delete Visit</h3>
            <button
              className="close-btn"
              onClick={() => setShowDeleteConfirmModal(false)}
              disabled={isDeleting}
            >
              <i className="fas fa-times"></i>
            </button>
          </div>

          <div className="modal-body delete-body">
            <div className="delete-warning-icon">
              <i className="fas fa-exclamation-triangle"></i>
            </div>

            <div className="delete-message">
              <h4>Are you sure you want to delete this visit?</h4>
              <p>
                <strong>{getVisitTypeLabel(visit.visitType)}</strong> with{' '}
                {getTherapistName(visit.therapist)} on {visitDate}
                {visit.time ? ` at ${formatTime(visit.time)}` : ''}
              </p>
              <p className="delete-warning">This action cannot be undone.</p>
            </div>
          </div>

          <div className="modal-footer delete-footer">
            <button
              className="cancel-btn"
              onClick={() => setShowDeleteConfirmModal(false)}
              disabled={isDeleting}
            >
              Cancel
            </button>
            <button
              className="delete-confirm-btn"
              onClick={handleDeleteVisit}
              disabled={isDeleting}
            >
              {isDeleting ? (
                <span className="btn-loading">
                  <i className="fas fa-spinner fa-spin"></i> Deleting...
                </span>
              ) : (
                'Delete Visit'
              )}
            </button>
          </div>
        </div>
      </div>
    );
  };

  // Render loading screen
  const renderLoadingScreen = () => {
    return (
      <div className="loading-overlay">
        <div className="loading-container">
          <div className="loading-spinner">
            <div className="spinner-orbit"></div>
            <div className="spinner-orbit-secondary"></div>
            <svg className="spinner-circle" viewBox="0 0 50 50">
              <defs>
                <linearGradient id="gradient-stroke" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#4f46e5" />
                  <stop offset="50%" stopColor="#818cf8" />
                  <stop offset="100%" stopColor="#3b82f6" />
                </linearGradient>
              </defs>
              <circle
                className="path"
                cx="25"
                cy="25"
                r="20"
                fill="none"
                strokeWidth="4"
              />
            </svg>
            <div className="loading-particles">
              {Array.from({ length: 12 }).map((_, index) => (
                <div key={index} className="particle"></div>
              ))}
            </div>
          </div>
          <div className="loading-text">
            <span data-text="Loading">Loading</span>
            <div className="loading-dots">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Render visits list
  const renderVisitsList = () => {
    const groupedVisits = groupVisitsByMonth();
    const sortedMonths = Object.keys(groupedVisits).sort((a, b) => {
      const [monthA, yearA] = a.split(' ');
      const [monthB, yearB] = b.split(' ');
      const dateA = new Date(`${monthA} 1, ${yearA}`);
      const dateB = new Date(`${monthB} 1, ${yearB}`);
      return dateA - dateB;
    });

    if (sortedMonths.length === 0) {
      return (
        <div className="empty-visits-container">
          <div className="empty-state">
            <i className="fas fa-calendar-times"></i>
            <h3>No Visits Found</h3>
            <p>No therapy visits match the current filters or no visits have been scheduled yet.</p>
            <button className="add-visit-btn" onClick={() => handleShowCalendar()}>
              <i className="fas fa-plus-circle"></i>
              <span>Schedule First Visit</span>
            </button>
          </div>
        </div>
      );
    }

    return (
      <div className="visits-list-container">
        <div className="visits-header">
          <h3>Scheduled Therapy Visits</h3>
          <div className="header-actions">
            <button
              className="quick-add-btn"
              onClick={() => {
                setShowAddVisitModal(true);
                setFormData({
                  ...formData,
                  date: formatDateToLocalISOString(new Date()),
                });
              }}
            >
              <i className="fas fa-plus"></i>
              <span>Quick Add</span>
            </button>
            <button className="view-calendar-btn" onClick={() => handleShowCalendar()}>
              <i className="fas fa-calendar-alt"></i>
              <span>View Calendar</span>
            </button>
          </div>
        </div>

        <div className="visits-filter">
          <div className="filter-pills">
            <button
              className={`filter-pill ${activeFilter === 'ALL' ? 'active' : ''}`}
              onClick={() => setActiveFilter('ALL')}
            >
              All
            </button>
            <button
              className={`filter-pill ${activeFilter === 'SCHEDULED' ? 'active' : ''}`}
              onClick={() => setActiveFilter('SCHEDULED')}
            >
              Upcoming
            </button>
            <button
              className={`filter-pill ${activeFilter === 'COMPLETED' ? 'active' : ''}`}
              onClick={() => setActiveFilter('COMPLETED')}
            >
              Completed
            </button>
            <button
              className={`filter-pill ${activeFilter === 'MISSED' ? 'active' : ''}`}
              onClick={() => setActiveFilter('MISSED')}
            >
              Missed
            </button>
            <button
              className={`filter-pill ${activeFilter === 'PENDING' ? 'active' : ''}`}
              onClick={() => setActiveFilter('PENDING')}
            >
              Pending
            </button>
          </div>
          <div className="search-box">
            <i className="fas fa-search"></i>
            <input
              type="text"
              placeholder="Search visits..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <button
                className="clear-search"
                onClick={() => setSearchQuery('')}
              >
                <i className="fas fa-times"></i>
              </button>
            )}
          </div>
        </div>

        <div className="visits-timeline">
          {sortedMonths.map((month) => (
            <div key={month} className="month-group">
              <div className="month-header">
                <i className="fas fa-calendar-alt"></i>
                <h4>{month}</h4>
                <span className="visit-count">
                  {groupedVisits[month].length} {groupedVisits[month].length === 1 ? 'visit' : 'visits'}
                </span>
              </div>
              <div className="month-visits">
                {groupedVisits[month].map((visit) => renderVisitCard(visit))}
              </div>
            </div>
          ))}
        </div>

        <div className="add-visit-floating">
          <button
            className="add-visit-btn"
            onClick={() => {
              setShowAddVisitModal(true);
              setFormData({
                ...formData,
                date: formatDateToLocalISOString(new Date()),
              });
            }}
            aria-label="Add new visit"
          >
            <i className="fas fa-plus"></i>
          </button>
          <div className="tooltip">Add New Visit</div>
        </div>
      </div>
    );
  };

  // Render calendar day
  const renderCalendarDay = (date, visits) => {
    const dayVisits = visits.filter(
      (visit) => visit.date === formatDateToLocalISOString(date) && isWithinCertPeriod(visit.date)
    );

    if (dayVisits.length === 0) return null;

    return (
      <div className="calendar-day-detail">
        <div className="day-date">
          <span className="day-name">{date.toLocaleDateString('en-US', { weekday: 'short' })}</span>
          <span className="day-number">{date.getDate()}</span>
        </div>

        <div className="day-visits">
          {dayVisits.map((visit) => {
            const therapistColors = getTherapistColors(visit.therapist);
            return (
              <div
                key={visit.id}
                className="calendar-visit-item"
                style={{
                  borderLeft: `4px solid ${therapistColors.primary}`,
                  backgroundColor: therapistColors.secondary,
                }}
              >
                <div className="visit-time">{visit.time ? formatTime(visit.time) : 'No time set'}</div>
                <div className="visit-details">
                  <div className="visit-title">{getVisitTypeLabel(visit.visitType)}</div>
                  <div className="visit-therapist">{getTherapistName(visit.therapist)}</div>
                  {visit.notes && <div className="visit-notes">{visit.notes}</div>}
                </div>
                <div
                  className="visit-status-indicator"
                  style={{ backgroundColor: getStatusColor(visit.status) }}
                >
                  {getStatusLabel(visit.status)}
                </div>
                <div className="visit-actions">
                  <button
                    className="edit-visit-btn"
                    onClick={() => handleEditVisit(visit)}
                  >
                    <i className="fas fa-edit"></i>
                  </button>
                  <button
                    className="delete-visit-btn"
                    onClick={() => handleInitiateDelete(visit.id)}
                  >
                    <i className="fas fa-trash"></i>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className="schedule-component">
      <div className="card-header">
        <div className="header-title">
          <i className="fas fa-calendar-alt"></i>
          <h3>Patient Schedule</h3>
        </div>
      </div>

      <VisitCompletionModal
        isOpen={showCompletionModal}
        onClose={() => setShowCompletionModal(false)}
        visitData={completionVisitData}
        onSave={handleCompletionFormSave}
      />

      <div className="card-body">
        {isLoading && renderLoadingScreen()}

        {!isCalendarView ? (
          renderVisitsList()
        ) : (
          <div className="calendar-view">
            <div className="calendar-nav">
              <button className="back-to-visits" onClick={handleBackToVisits}>
                <i className="fas fa-arrow-left"></i>
                <span>Back to Visits</span>
              </button>
              <button
                className="add-visit-calendar"
                onClick={() => {
                  setShowAddVisitModal(true);
                  setFormData({
                    ...formData,
                    date: formatDateToLocalISOString(new Date()),
                  });
                }}
              >
                <i className="fas fa-plus"></i>
                <span>Add Visit</span>
              </button>
            </div>
            {renderCalendar()}
          </div>
        )}
      </div>

      {showAddVisitModal && renderAddVisitModal()}
      {showEditVisitModal && renderEditVisitModal()}
      {showDeleteConfirmModal && renderDeleteConfirmModal()}
    </div>
  );
};

export default ScheduleComponent;