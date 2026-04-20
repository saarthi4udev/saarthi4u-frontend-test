'use client';

import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import styles from './EnquiryPopup.module.css';

// ✅ FIXED IMPORT
import { createConsultation } from '@/app/api/online_consulation';

interface FormData {
  fullName: string;
  mobileNumber: string;
  interestedIn: string;
  otherDetails?: string;
}

export default function EnquiryPopup() {
  const [isVisible, setIsVisible] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    mobileNumber: '',
    interestedIn: 'College Admission',
    otherDetails: '',
  });

  useEffect(() => {
    setMounted(true);
    const hasClosedThisSession = sessionStorage.getItem('enquiryPopupClosed');

    if (!hasClosedThisSession) {
      setIsVisible(true);
    }
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    const handleEscClose = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        handleClose();
      }
    };

    document.addEventListener('keydown', handleEscClose);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleEscClose);
      document.body.style.overflow = '';
    };
  }, [isVisible]);

  const handleClose = () => {
    setIsVisible(false);
    sessionStorage.setItem('enquiryPopupClosed', 'true');
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    let newValue = value;

    if (name === 'mobileNumber') {
      newValue = value.replace(/\D/g, '');
    }

    setFormData((prev) => ({
      ...prev,
      [name]: newValue,
    }));
  };

  const resetForm = () => {
    setFormData({
      fullName: '',
      mobileNumber: '',
      interestedIn: 'College Admission',
      otherDetails: '',
    });
  };

  // ✅ MAPPING FUNCTION (NO UI CHANGE)
  const mapInterest = (value: string) => {
    switch (value) {
      case 'College Admission':
      case 'Courses':
        return 'engineering';
      case 'Exams':
        return 'management';
      case 'Scholarships':
        return 'arts';
      case 'Placement':
        return 'management';
      case 'Career Guidance':
        return 'arts';
      case 'Others':
        return 'other';
      default:
        return 'other';
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (formData.fullName.trim().length === 0) {
      toast.error('Full name is required');
      return;
    }

    if (formData.mobileNumber.length !== 10) {
      toast.error('Please enter a valid 10-digit mobile number');
      return;
    }

    if (
      formData.interestedIn === 'Others' &&
      !(formData.otherDetails || '').trim()
    ) {
      toast.error('Please enter additional details');
      return;
    }

    // ✅ FIXED PAYLOAD
    const payload = {
      fullName: formData.fullName.trim(),
      email: null,
      phone: formData.mobileNumber.trim(),
      message: (formData.otherDetails || '').trim() || null,
      courseInterest: mapInterest(formData.interestedIn), // 🔥 important fix
      preferredStateCity: null,
      preferredConsultationDate: null,
      preferredTime: null,
    };

    // 🔍 DEBUG LOGS
    console.log('========== FINAL DEBUG ==========');
    console.log('Form Data:', formData);
    console.log('Payload:', payload);
    console.log('Email:', payload.email);
    console.log('Mapped Interest:', payload.courseInterest);
    console.log('================================');

    try {
      setIsSubmitting(true);

      console.log('🚀 Calling API...');

      const result = await createConsultation(payload);

      console.log('✅ API RESPONSE:', result);

      if (result.success) {
        toast.success(result.message || 'Consultation submitted successfully');
        resetForm();
        handleClose();
      } else {
        toast.error(result.message || 'Failed to submit consultation');
      }
    } catch (error: any) {
      console.error('❌ API ERROR:', error);
      toast.error(error?.message || 'Something went wrong while submitting');
    } finally {
      setIsSubmitting(false);
    }
  };

  const isFormValid =
    formData.fullName.trim().length > 0 &&
    formData.mobileNumber.trim().length === 10 &&
    (formData.interestedIn !== 'Others' ||
      (formData.otherDetails || '').trim().length > 0);

  if (!isVisible || !mounted) return null;

  return (
    <>
      <div className={styles.overlay} onClick={handleClose} />

      <div className={styles.modal}>
        <button
          className={styles.closeButton}
          onClick={handleClose}
          aria-label="Close popup"
          title="Close"
          disabled={isSubmitting}
        >
          ✕
        </button>

        <div className={styles.content}>
          <div className={styles.header}>
            <h2 className={styles.title}>
              ✨ Need Guidance? We&apos;re Here to Help!
            </h2>
            <p className={styles.description}>
              📝 Submit your details and our expert will contact you shortly.
            </p>
          </div>

          {/* 🔥 UI NOT CHANGED AT ALL */}
          <form onSubmit={handleSubmit} className={styles.form}>
            {/* Full Name Field */}
            <div className={styles.formGroup}>
              <label htmlFor="fullName" className={styles.label}>
                👤 Full Name <strong>*</strong>
              </label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                placeholder="Enter your full name"
                value={formData.fullName}
                onChange={handleInputChange}
                required
                className={styles.input}
                disabled={isSubmitting}
              />
            </div>

            {/* Mobile Number Field */}
            <div className={styles.formGroup}>
              <label htmlFor="mobileNumber" className={styles.label}>
                📱 Mobile Number <strong>*</strong>
              </label>
              <input
                type="tel"
                inputMode="numeric"
                id="mobileNumber"
                name="mobileNumber"
                placeholder="Enter your mobile number"
                value={formData.mobileNumber}
                onChange={handleInputChange}
                pattern="[0-9]{10}"
                maxLength={10}
                required
                className={styles.input}
                disabled={isSubmitting}
              />
            </div>

            {/* Interested In Field */}
            <div className={styles.formGroup}>
              <label htmlFor="interestedIn" className={styles.label}>
                🎯 Interested In <strong>*</strong>
              </label>
              <select
                id="interestedIn"
                name="interestedIn"
                value={formData.interestedIn}
                onChange={handleInputChange}
                className={styles.select}
                disabled={isSubmitting}
              >
                <option value="College Admission">🎓 College Admission</option>
                <option value="Courses">📚 Courses</option>
                <option value="Exams">✏️ Exams</option>
                <option value="Scholarships">🏆 Scholarships</option>
                <option value="Placement">💼 Placement</option>
                <option value="Career Guidance">💼 Career Guidance</option>
                <option value="Others">🔧 Others</option>
              </select>
            </div>

            {formData.interestedIn === 'Others' && (
              <div className={styles.formGroup}>
                <textarea
                  name="otherDetails"
                  value={formData.otherDetails}
                  onChange={handleInputChange}
                  className={styles.input}
                  disabled={isSubmitting}
                />
              </div>
            )}

            <button
              type="submit"
              className={styles.submitButton}
              disabled={!isFormValid || isSubmitting}
            >
              {isSubmitting ? 'Submitting...' : '✓ Submit Enquiry'}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}