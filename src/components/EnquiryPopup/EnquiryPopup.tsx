'use client';

import { useState, useEffect } from 'react';
import styles from './EnquiryPopup.module.css';

interface FormData {
  fullName: string;
  mobileNumber: string;
  interestedIn: string;
  otherDetails?: string; // only used when "Others" is selected
}

export default function EnquiryPopup() {
  const [isVisible, setIsVisible] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    mobileNumber: '',
    interestedIn: 'College Admission',
    otherDetails: '',
  });

  // Show popup almost instantly on every page load
  useEffect(() => {
    setMounted(true);
    
    // Check sessionStorage (resets on browser close)
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
    // Mark popup as closed in sessionStorage (resets on browser close)
    sessionStorage.setItem('enquiryPopupClosed', 'true');
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target as HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;

    let newValue = value;

    // restrict mobile number to digits only
    if (name === 'mobileNumber') {
      newValue = value.replace(/\D/g, '');
    }

    setFormData((prev) => ({
      ...prev,
      [name]: newValue,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validate mobile number
    if (formData.mobileNumber.length < 10) {
      alert('Please enter a valid mobile number');
      return;
    }

    console.log('Enquiry Form Data:', {
      fullName: formData.fullName,
      mobileNumber: formData.mobileNumber,
      interestedIn: formData.interestedIn,
      otherDetails: formData.otherDetails,
      timestamp: new Date().toISOString(),
    });

    alert('Thank you! Our expert will contact you shortly.');

    // Reset form and close popup
    setFormData({
      fullName: '',
      mobileNumber: '',
      interestedIn: 'College Admission',
      otherDetails: '',
    });
    handleClose();
  };

  const isFormValid =
    formData.fullName.trim().length > 0 &&
    formData.mobileNumber.trim().length >= 10 &&
    (formData.interestedIn !== 'Others' || (formData.otherDetails || '').trim().length > 0);

  if (!isVisible || !mounted) return null;

  return (
    <>
      {/* Overlay */}
      <div className={styles.overlay} onClick={handleClose} />

      {/* Modal */}
      <div className={styles.modal}>
        {/* Close Button */}
        <button
          className={styles.closeButton}
          onClick={handleClose}
          aria-label="Close popup"
          title="Close"
        >
          ✕
        </button>

        {/* Content */}
        <div className={styles.content}>
          {/* Header */}
          <div className={styles.header}>
            <h2 className={styles.title}>
              ✨ Need Guidance? We're Here to Help!
            </h2>
            <p className={styles.description}>
              📝 Submit your details and our expert will contact you shortly.
            </p>
          </div>

          {/* Form */}
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
                aria-invalid={formData.mobileNumber.length > 0 && formData.mobileNumber.length < 10}
                className={styles.input}
              />
              <small className={styles.helperText}>
                {formData.mobileNumber.length > 0 && formData.mobileNumber.length < 10
                  ? `Please enter ${10 - formData.mobileNumber.length} more digit${10 - formData.mobileNumber.length === 1 ? '' : 's'}`
                  : 'Enter a valid 10-digit mobile number'}
              </small>
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

            {/* Additional details for Others */}
            {formData.interestedIn === 'Others' && (
              <div className={styles.formGroup}>
                <label htmlFor="otherDetails" className={styles.label}>
                  📌 Please specify <strong>*</strong>
                </label>
                <textarea
                  id="otherDetails"
                  name="otherDetails"
                  placeholder="Briefly mention what you're interested in"
                  value={formData.otherDetails}
                  onChange={handleInputChange}
                  className={styles.input}
                  rows={3}
                  maxLength={140}
                  required
                />
                <small className={styles.helperText}>
                  A short description helps us assist you better. ({(formData.otherDetails || '').length}/140)
                </small>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              className={styles.submitButton}
              disabled={!isFormValid}
            >
              ✓ Submit Enquiry
            </button>
          </form>

          {/* Footer Note */}
          <p className={styles.footerNote}>
            We respect your privacy and will not spam you.
          </p>
        </div>
      </div>
    </>
  );
}
