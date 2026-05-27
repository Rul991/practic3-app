// src/components/common/ActionButtons/ActionButtons.tsx
import styles from './ActionButtons.module.less';

interface ActionButtonsProps {
    onSave: () => void;
    onCancel: () => void;
    saveText?: string;
    cancelText?: string;
}

const ActionButtons = ({ onSave, onCancel, saveText = 'Сохранить', cancelText = 'Отмена' }: ActionButtonsProps) => {
    return (
        <div className={styles.buttonGroup}>
            <button onClick={onSave} className={styles.saveButton}>{saveText}</button>
            <button onClick={onCancel} className={styles.cancelButton}>{cancelText}</button>
        </div>
    );
};

export default ActionButtons;