export type FieldType = 'TEXT' | 'NUMBER' | 'EMAIL';

export enum ButtonVariant {
  PRIMARY = 'primary',
  SECONDARY = 'secondary',
  DANGER = 'danger'
}

export interface BaseField {
  label: string;
  type: FieldType;
  required: boolean;
  order: number;
}

export interface BaseSection {
  title: string;
  description?: string;
  order: number;
  fields: BaseField[];
}

export interface BaseForm {
  title: string;
  description: string;
  sections: BaseSection[];
}

export interface Field extends BaseField {
  id: string;
}

export interface Section extends BaseSection {
  id: string;
  fields: Field[];
}

export interface Form extends BaseForm {
  id: string;
  token: string;
  createdAt: string;
  updatedAt: string;
  sections: Section[];
  responseCount?: number;
}

export type CreateFormData = BaseForm;
export type UpdateFormData = Partial<BaseForm>;
export type CreateFieldData = BaseField;
export type CreateSectionData = BaseSection;

export interface FormResponse {
  id: string;
  fieldId: string;
  value: string;
}

export interface FormSubmission {
  id: string;
  formId: string;
  responses: FormResponse[];
  submittedAt: string;
}

export interface SubmissionData {
  responses: Array<{
    fieldId: string;
    value: string;
  }>;
}

export interface User {
  id: string;
  username: string;
  email: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface AuthContextType {
  user: AuthResponse['user'] | null;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}

export interface LoginFormProps {
  onLogin: (credentials: LoginCredentials) => Promise<void>;
  error?: string;
  isLoading?: boolean;
}

export interface FormCardProps {
  form: Form;
  onEdit?: (form: Form) => void;
  onDelete?: (formId: string) => void;
}

export interface Step {
  id: number;
  title: string;
  subtitle?: string;
  completed: boolean;
  active: boolean;
}

export interface StepperProps {
  steps: Step[];
}

export interface FormBuilderProps {
  onFormCreated: (form: { id: string; title: string; token: string }) => void;
}

export interface FormBuilderResponse {
  data: {
    id: string;
    title: string;
    token: string;
  };
}

export interface PrivateLayoutProps {
  children: React.ReactNode;
}

export interface StyledLinkProps {
  href: string;
  children: React.ReactNode;
}

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
}

export interface CheckBoxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string;
}

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  children?: React.ReactNode;
}

export interface OptionProps extends React.OptionHTMLAttributes<HTMLOptionElement> {
  children?: React.ReactNode;
}

export interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
}

export interface FormValues {
  [fieldId: string]: string | number;
}

export interface FormErrors {
  [fieldId: string]: string;
}