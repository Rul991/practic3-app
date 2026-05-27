// src/components/common/FileLink/FileLink.tsx
import styles from './FileLink.module.less';

interface FileLinkProps {
    url: string;
    name: string;
    size?: string;
}

const FileLink = ({ url, name, size }: FileLinkProps) => {
    if (!url) return null;
    return (
        <a href={url} className={styles.fileLink} target="_blank" rel="noopener noreferrer">
            <span className={styles.fileName}>{name}</span>
            {size && <span className={styles.fileInfo}>({size})</span>}
        </a>
    );
};

export default FileLink;