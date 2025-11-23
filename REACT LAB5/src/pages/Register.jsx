import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";

const Register = () => {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const isRTL = language === 'ar';

  const [formData, setFormData] = useState({
    email: "",
    name: "",
    username: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const translations = {
    en: {
      title: "Register",
      email: "Email",
      name: "Name",
      username: "User Name",
      password: "Password",
      confirmPassword: "Confirm Password",
      register: "Register",
      emailRequired: "Email is required",
      emailInvalid: "Email format is invalid",
      nameRequired: "Name is required",
      usernameRequired: "Username is required",
      usernameNoSpaces: "Username cannot contain spaces",
      passwordRequired: "Password is required",
      passwordMinLength: "Password must be at least 8 characters",
      passwordRequirements: "Password must contain at least one lowercase letter, one uppercase letter, one digit, and one special character (*@%$#)",
      confirmPasswordRequired: "Confirm password is required",
      passwordsNotMatch: "Passwords do not match",
    },
    ar: {
      title: "تسجيل",
      email: "البريد الإلكتروني",
      name: "الاسم",
      username: "اسم المستخدم",
      password: "كلمة المرور",
      confirmPassword: "تأكيد كلمة المرور",
      register: "تسجيل",
      emailRequired: "البريد الإلكتروني مطلوب",
      emailInvalid: "صيغة البريد الإلكتروني غير صحيحة",
      nameRequired: "الاسم مطلوب",
      usernameRequired: "اسم المستخدم مطلوب",
      usernameNoSpaces: "اسم المستخدم لا يمكن أن يحتوي على مسافات",
      passwordRequired: "كلمة المرور مطلوبة",
      passwordMinLength: "كلمة المرور يجب أن تكون 8 أحرف على الأقل",
      passwordRequirements: "كلمة المرور يجب أن تحتوي على حرف صغير، حرف كبير، رقم، ورمز خاص (*@%$#)",
      confirmPasswordRequired: "تأكيد كلمة المرور مطلوب",
      passwordsNotMatch: "كلمات المرور غير متطابقة",
    },
  };

  const t = translations[language];

  // Email validation regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Password validation regex: at least one lowercase, one uppercase, one digit, one special character
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[*@%$#])/;

  const validateField = (name, value) => {
    let error = "";

    switch (name) {
      case "email":
        if (!value) {
          error = t.emailRequired;
        } else if (!emailRegex.test(value)) {
          error = t.emailInvalid;
        }
        break;
      case "name":
        if (!value) {
          error = t.nameRequired;
        }
        break;
      case "username":
        if (!value) {
          error = t.usernameRequired;
        } else if (/\s/.test(value)) {
          error = t.usernameNoSpaces;
        }
        break;
      case "password":
        if (!value) {
          error = t.passwordRequired;
        } else if (value.length < 8) {
          error = t.passwordMinLength;
        } else if (!passwordRegex.test(value)) {
          error = t.passwordRequirements;
        }
        break;
      case "confirmPassword":
        if (!value) {
          error = t.confirmPasswordRequired;
        } else if (value !== formData.password) {
          error = t.passwordsNotMatch;
        }
        break;
      default:
        break;
    }

    return error;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Validate on change if field was touched
    if (touched[name]) {
      const error = validateField(name, value);
      setErrors((prev) => ({ ...prev, [name]: error }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    const error = validateField(name, value);
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const validateAll = () => {
    const newErrors = {};
    const newTouched = {};

    Object.keys(formData).forEach((key) => {
      newTouched[key] = true;
      const error = validateField(key, formData[key]);
      if (error) {
        newErrors[key] = error;
      }
    });

    setTouched(newTouched);
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate all fields
    if (!validateAll()) {
      return;
    }

    // Show alert with form data
    alert(JSON.stringify(formData, null, 2));

    // Redirect to home page
    navigate("/");
  };

  return (
    <main className="container py-10">
      <div className="max-w-md mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
          {t.title}
        </h1>

        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-lg shadow-md p-6 space-y-4"
        >
          {/* Name Field */}
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              {t.name}
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 ${
                errors.name ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-500">{errors.name}</p>
            )}
          </div>

          {/* Email Field */}
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
              name="email"
              value={formData.email}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 ${
                errors.email ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-500">{errors.email}</p>
            )}
          </div>

          {/* Username Field */}
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              {t.username}
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 ${
                errors.username ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.username && (
              <p className="mt-1 text-sm text-red-500">{errors.username}</p>
            )}
          </div>

          {/* Password Field */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              {t.password}
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 ${
                errors.password ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.password && (
              <p className="mt-1 text-sm text-red-500">{errors.password}</p>
            )}
          </div>

          {/* Confirm Password Field */}
          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              {t.confirmPassword}
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 ${
                errors.confirmPassword ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.confirmPassword && (
              <p className="mt-1 text-sm text-red-500">
                {errors.confirmPassword}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-md transition mt-6"
          >
            {t.register}
          </button>
        </form>
      </div>
    </main>
  );
};

export default Register;

