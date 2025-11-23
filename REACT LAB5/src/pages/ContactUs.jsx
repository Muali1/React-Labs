import { useState } from "react";
import { useForm } from "react-hook-form";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { useLanguage } from "../context/LanguageContext";

const ContactUs = () => {
  const { language } = useLanguage();
  const isRTL = language === 'ar';
  const [showSuccess, setShowSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch,
  } = useForm();

  const phoneNumber = watch("phoneNumber");

  const translations = {
    en: {
      title: "Send Us a Message",
      subtitle: "Please fill in the form below to get in touch with us.",
      firstName: "First name",
      lastName: "Last name",
      email: "Email address",
      phone: "Phone Number",
      message: "Message",
      terms: "I've read and agree with",
      termsLink: "Terms of Service",
      privacyLink: "Privacy Policy",
      and: "and",
      submit: "Submit",
      successMessage: "Thank you! We will get back to you soon.",
      firstNameRequired: "First name is required",
      lastNameRequired: "Last name is required",
      emailRequired: "Email is required",
      emailInvalid: "Email format is invalid",
      messageRequired: "Message is required",
      messageMinLength: "Message must be at least 10 characters",
      messageMaxLength: "Message cannot exceed 500 characters",
      termsRequired: "You must agree to the terms",
    },
    ar: {
      title: "أرسل لنا رسالة",
      subtitle: "يرجى ملء النموذج أدناه للتواصل معنا.",
      firstName: "الاسم الأول",
      lastName: "اسم العائلة",
      email: "البريد الإلكتروني",
      phone: "رقم الهاتف",
      message: "الرسالة",
      terms: "لقد قرأت ووافقت على",
      termsLink: "شروط الخدمة",
      privacyLink: "سياسة الخصوصية",
      and: "و",
      submit: "إرسال",
      successMessage: "شكراً لك! سنتواصل معك قريباً.",
      firstNameRequired: "الاسم الأول مطلوب",
      lastNameRequired: "اسم العائلة مطلوب",
      emailRequired: "البريد الإلكتروني مطلوب",
      emailInvalid: "صيغة البريد الإلكتروني غير صحيحة",
      messageRequired: "الرسالة مطلوبة",
      messageMinLength: "الرسالة يجب أن تكون 10 أحرف على الأقل",
      messageMaxLength: "الرسالة لا يمكن أن تتجاوز 500 حرف",
      termsRequired: "يجب الموافقة على الشروط",
    },
  };

  const t = translations[language];

  const onSubmit = (data) => {
    console.log("Form data:", data);
    setShowSuccess(true);
    
    // Reset form after 2 seconds
    setTimeout(() => {
      reset();
      setShowSuccess(false);
    }, 2000);
  };

  return (
    <main className="container py-10">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2 text-center">
            {t.title}
          </h1>
          <p className="text-gray-600 mb-6 text-center">{t.subtitle}</p>

          {showSuccess && (
            <div className="mb-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded-md text-center">
              {t.successMessage}
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* First Name and Last Name Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="firstName"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  {t.firstName}
                </label>
                <input
                  type="text"
                  id="firstName"
                  {...register("firstName", {
                    required: t.firstNameRequired,
                  })}
                  className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 ${
                    errors.firstName ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.firstName && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.firstName.message}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="lastName"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  {t.lastName}
                </label>
                <input
                  type="text"
                  id="lastName"
                  {...register("lastName", {
                    required: t.lastNameRequired,
                  })}
                  className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 ${
                    errors.lastName ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.lastName && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.lastName.message}
                  </p>
                )}
              </div>
            </div>

            {/* Email and Phone Number Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  {t.email}
                </label>
                <input
                  type="email"
                  id="email"
                  {...register("email", {
                    required: t.emailRequired,
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: t.emailInvalid,
                    },
                  })}
                  className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 ${
                    errors.email ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.email.message}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="phoneNumber"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  {t.phone}
                </label>
                <PhoneInput
                  international
                  defaultCountry="US"
                  value={phoneNumber}
                  onChange={(value) => setValue("phoneNumber", value)}
                  className={`phone-input ${
                    errors.phoneNumber ? "border-red-500" : ""
                  }`}
                />
                {errors.phoneNumber && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.phoneNumber.message}
                  </p>
                )}
              </div>
            </div>

            {/* Message Field */}
            <div>
              <label
                htmlFor="message"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                {t.message}
              </label>
              <textarea
                id="message"
                rows={5}
                {...register("message", {
                  required: t.messageRequired,
                  minLength: {
                    value: 10,
                    message: t.messageMinLength,
                  },
                  maxLength: {
                    value: 500,
                    message: t.messageMaxLength,
                  },
                })}
                className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 ${
                  errors.message ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.message && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.message.message}
                </p>
              )}
            </div>

            {/* Terms Checkbox */}
            <div className="flex items-start">
              <input
                type="checkbox"
                id="terms"
                {...register("terms", {
                  required: t.termsRequired,
                })}
                className="mt-1 mr-2"
              />
              <label
                htmlFor="terms"
                className="text-sm text-gray-700 cursor-pointer"
              >
                {t.terms}{" "}
                <a href="#" className="underline text-blue-600 hover:text-blue-800">
                  {t.termsLink}
                </a>{" "}
                {t.and}{" "}
                <a href="#" className="underline text-blue-600 hover:text-blue-800">
                  {t.privacyLink}
                </a>
              </label>
            </div>
            {errors.terms && (
              <p className="mt-1 text-sm text-red-500">{errors.terms.message}</p>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-gray-900 hover:bg-gray-800 text-white font-medium py-3 px-4 rounded-md transition mt-6"
            >
              {t.submit}
            </button>
          </form>
        </div>
      </div>

      <style>{`
        .phone-input {
          width: 100%;
        }
        .phone-input .PhoneInputInput {
          width: 100%;
          padding: 0.5rem 1rem;
          border: 1px solid #d1d5db;
          border-radius: 0.375rem;
          outline: none;
        }
        .phone-input .PhoneInputInput:focus {
          border-color: #22c55e;
          ring: 2px;
          ring-color: #22c55e;
        }
        .phone-input .PhoneInputCountry {
          margin-right: 0.5rem;
        }
      `}</style>
    </main>
  );
};

export default ContactUs;

