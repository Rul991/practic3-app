import { type ReactNode } from 'react';
import styles from './Section.module.less';

interface SectionProps {
    title: string;
    children: ReactNode;
    isEditing?: boolean;
    onAdd?: () => void;
    addButtonText?: string;
}

const Section = ({ title, children, isEditing, onAdd, addButtonText = '+ Добавить' }: SectionProps) => {
    return (
        <section className={styles.section}>
            <div className={styles.sectionHeader}>
                <h3 className={styles.sectionTitle}>{title}</h3>
                {isEditing && onAdd && (
                    <button onClick={onAdd} className={styles.addButton}>
                        {addButtonText}
                    </button>
                )}
            </div>
            <div className={styles.infoBlock}>
                {children}
            </div>
        </section>
    );
};

export default Section;