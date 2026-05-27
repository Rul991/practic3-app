// src/components/common/EditField/EditField.tsx
import styles from './EditField.module.less';

interface EditFieldProps {
    label: string;
    value: string;
    onChange: (value: string) => void;
    type?: string;
    placeholder?: string;
    small?: boolean;
}

const EditField = ({ label, value, onChange, type = 'text', placeholder = '', small = false }: EditFieldProps) => {
    return (
        <div className={styles.editRow}>
            <span className={small ? styles.editLabelSmall : styles.editLabel}>{label}:</span>
            <input
                type={type}
                className={styles.editInput}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder}
            />
        </div>
    );
};

export default EditField;