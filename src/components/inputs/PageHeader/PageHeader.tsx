// src/components/common/PageHeader/PageHeader.tsx
import styles from './PageHeader.module.less';

interface PageHeaderProps {
    title: string;
    isEditing?: boolean;
    onEdit?: () => void;
}

const PageHeader = ({ title, isEditing, onEdit }: PageHeaderProps) => {
    return (
        <div className={styles.cardHeader}>
            <h2 className={styles.title}>{title}</h2>
            {!isEditing && onEdit && (
                <button onClick={onEdit} className={styles.editIcon}>
                     Редактировать
                </button>
            )}
        </div>
    );
};

export default PageHeader;