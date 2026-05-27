import { type ReactNode } from 'react';
import styles from './EditCard.module.less';

interface EditCardProps {
    id: number;
    onRemove: (id: number) => void;
    children: ReactNode;
}

const EditCard = ({ id, onRemove, children }: EditCardProps) => {
    return (
        <div className={styles.editCard}>
            <button onClick={() => onRemove(id)} className={styles.removeButton}>
                ✖
            </button>
            {children}
        </div>
    );
};

export default EditCard;