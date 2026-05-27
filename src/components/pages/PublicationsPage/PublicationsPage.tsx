import { useState } from 'react'
import styles from './PublicationsPage.module.less'
import PageHeader from '../../../components/inputs/PageHeader'
import Section from '../../../components/inputs/Section'
import EditCard from '../../../components/inputs/EditCard'
import EditField from '../../../components/inputs/EditField'
import ActionButtons from '../../../components/inputs/ActionButtons'
import type { WorksViewData } from '../../../types/info'

const PublicationsPage = () => {
    const [isEditing, setIsEditing] = useState(false)

    const [viewData, setViewData] = useState<WorksViewData>({
        mediaPublications: [],
        authorWorks: []
    })

    const [editData, setEditData] = useState(viewData)

    const handleEdit = () => {
        setEditData(viewData)
        setIsEditing(true)
    }

    const handleSave = () => {
        setViewData(editData)
        setIsEditing(false)
    }

    const handleCancel = () => {
        setEditData(viewData)
        setIsEditing(false)
    }

    const addMediaPublication = () => {
        const newId = Date.now()
        setEditData(prev => ({
            ...prev,
            mediaPublications: [...prev.mediaPublications, {
                id: newId, year: new Date().getFullYear(), title: '', publisher: '', pages: 0,
                isElectronic: false, files: {}
            }]
        }))
    }

    const updateMediaPublication = (id: number, field: string, value: any) => {
        setEditData(prev => ({
            ...prev,
            mediaPublications: prev.mediaPublications.map(item =>
                item.id === id ? { ...item, [field]: value } : item
            )
        }))
    }

    const removeMediaPublication = (id: number) => {
        setEditData(prev => ({
            ...prev,
            mediaPublications: prev.mediaPublications.filter(item => item.id !== id)
        }))
    }

    const addAuthorWork = () => {
        const newId = Date.now()
        setEditData(prev => ({
            ...prev,
            authorWorks: [...prev.authorWorks, {
                id: newId, year: new Date().getFullYear(), title: '', workType: '', publisher: '', reviewers: [], files: {}
            }]
        }))
    }

    const updateAuthorWork = (id: number, field: string, value: any) => {
        setEditData(prev => ({
            ...prev,
            authorWorks: prev.authorWorks.map(item =>
                item.id === id ? { ...item, [field]: value } : item
            )
        }))
    }

    const removeAuthorWork = (id: number) => {
        setEditData(prev => ({
            ...prev,
            authorWorks: prev.authorWorks.filter(item => item.id !== id)
        }))
    }

    const addReviewer = (id: number) => {
        setEditData(prev => ({
            ...prev,
            authorWorks: prev.authorWorks.map(item =>
                item.id === id ? { ...item, reviewers: [...item.reviewers, ''] } : item
            )
        }))
    }

    const updateReviewer = (id: number, index: number, value: string) => {
        setEditData(prev => ({
            ...prev,
            authorWorks: prev.authorWorks.map(item =>
                item.id === id ? {
                    ...item,
                    reviewers: item.reviewers.map((r, i) => i === index ? value : r)
                } : item
            )
        }))
    }

    const removeReviewer = (id: number, index: number) => {
        setEditData(prev => ({
            ...prev,
            authorWorks: prev.authorWorks.map(item =>
                item.id === id ? {
                    ...item,
                    reviewers: item.reviewers.filter((_, i) => i !== index)
                } : item
            )
        }))
    }

    const renderFileLink = (file: { url: string; name: string; size: string } | undefined) => {
        if (!file || !file.url) return null
        return (
            <a href={file.url} className={styles.fileLink} target="_blank" rel="noopener noreferrer">
                <span className={styles.fileName}>{file.name}</span>
                <span className={styles.fileInfo}>({file.size})</span>
            </a>
        )
    }

    return (
        <div className={styles.container}>
            <div className={styles.card}>
                <PageHeader
                    title="ПУБЛИКАЦИИ"
                    isEditing={isEditing}
                    onEdit={handleEdit}
                />

                <div className={styles.viewMode}>
                    <Section
                        title="ПУБЛИКАЦИИ В СПЕЦИАЛИЗИРОВАННЫХ СМИ"
                        isEditing={isEditing}
                        onAdd={addMediaPublication}
                    >
                        {editData.mediaPublications.length === 0 && <div className={styles.emptyMessage}>Нет данных</div>}
                        {editData.mediaPublications.map(item => (
                            <div key={item.id} className={styles.publicationItem}>
                                {isEditing ? (
                                    <EditCard id={item.id} onRemove={removeMediaPublication}>
                                        <div className={styles.editRow}>
                                            <span className={styles.editLabel}>Год:</span>
                                            <input
                                                type="number"
                                                value={item.year}
                                                onChange={(e) => updateMediaPublication(item.id, 'year', parseInt(e.target.value))}
                                                className={styles.editInputShort}
                                            />
                                        </div>
                                        <EditField
                                            label="Название"
                                            value={item.title}
                                            onChange={(v) => updateMediaPublication(item.id, 'title', v)}
                                        />
                                        <EditField
                                            label="Издание"
                                            value={item.publisher}
                                            onChange={(v) => updateMediaPublication(item.id, 'publisher', v)}
                                        />
                                        <div className={styles.editRow}>
                                            <span className={styles.editLabel}>Страниц:</span>
                                            <input
                                                type="number"
                                                value={item.pages}
                                                onChange={(e) => updateMediaPublication(item.id, 'pages', parseInt(e.target.value))}
                                                className={styles.editInputShort}
                                            />
                                        </div>
                                        <div className={styles.editRow}>
                                            <span className={styles.editLabel}>Электронный ресурс:</span>
                                            <input
                                                type="checkbox"
                                                checked={item.isElectronic}
                                                onChange={(e) => updateMediaPublication(item.id, 'isElectronic', e.target.checked)}
                                                className={styles.checkbox}
                                            />
                                        </div>
                                        {item.isElectronic && (
                                            <EditField
                                                label="URL"
                                                value={item.electronicUrl || ''}
                                                onChange={(v) => updateMediaPublication(item.id, 'electronicUrl', v)}
                                                placeholder="https://..."
                                            />
                                        )}
                                        <div className={styles.editSubsection}>Файлы:</div>
                                        <EditField
                                            label="Свидетельство (URL)"
                                            value={item.files.certificate?.url || ''}
                                            onChange={(v) => {
                                                setEditData(prev => ({
                                                    ...prev,
                                                    mediaPublications: prev.mediaPublications.map(pub =>
                                                        pub.id === item.id ? {
                                                            ...pub,
                                                            files: {
                                                                ...pub.files,
                                                                certificate: { ...pub.files.certificate, url: v, name: 'Свидетельство о публикации', size: '182.86 Кб' }
                                                            }
                                                        } : pub
                                                    )
                                                }))
                                            }}
                                            placeholder="/files/..."
                                            small
                                        />
                                        <EditField
                                            label="Обложка (URL)"
                                            value={item.files.cover?.url || ''}
                                            onChange={(v) => {
                                                setEditData(prev => ({
                                                    ...prev,
                                                    mediaPublications: prev.mediaPublications.map(pub =>
                                                        pub.id === item.id ? {
                                                            ...pub,
                                                            files: {
                                                                ...pub.files,
                                                                cover: { ...pub.files.cover, url: v, name: 'Обложка', size: '182.86 Кб' }
                                                            }
                                                        } : pub
                                                    )
                                                }))
                                            }}
                                            placeholder="/files/..."
                                            small
                                        />
                                        <EditField
                                            label="Текст статьи (URL)"
                                            value={item.files.text?.url || ''}
                                            onChange={(v) => {
                                                setEditData(prev => ({
                                                    ...prev,
                                                    mediaPublications: prev.mediaPublications.map(pub =>
                                                        pub.id === item.id ? {
                                                            ...pub,
                                                            files: {
                                                                ...pub.files,
                                                                text: { ...pub.files.text, url: v, name: 'Текст статьи', size: '182.86 Кб' }
                                                            }
                                                        } : pub
                                                    )
                                                }))
                                            }}
                                            placeholder="/files/..."
                                            small
                                        />
                                    </EditCard>
                                ) : (
                                    <div className={styles.publicationContent}>
                                        <div className={styles.publicationHeader}>
                                            <span className={styles.yearBadge}>{item.year}</span>
                                            <span className={styles.publicationTitle}>{item.title}</span>
                                        </div>
                                        <div className={styles.publicationDetails}>
                                            {item.publisher && <span>// {item.publisher}</span>}
                                            {item.pages > 0 && <span>, {item.pages} c.</span>}
                                            {item.isElectronic && item.electronicUrl && (
                                                <span> [Электронный ресурс] // URL: <a href={item.electronicUrl} target="_blank" rel="noopener noreferrer" className={styles.siteLink}>{item.electronicUrl}</a></span>
                                            )}
                                        </div>
                                        {(item.files.certificate?.url || item.files.cover?.url || item.files.text?.url) && (
                                            <div className={styles.filesList}>
                                                {renderFileLink(item.files.certificate)}
                                                {renderFileLink(item.files.cover)}
                                                {renderFileLink(item.files.text)}
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        ))}
                    </Section>

                    <Section
                        title="АВТОРСКИЕ РАБОТЫ"
                        isEditing={isEditing}
                        onAdd={addAuthorWork}
                    >
                        {editData.authorWorks.length === 0 && <div className={styles.emptyMessage}>Нет данных</div>}
                        {editData.authorWorks.map(item => (
                            <div key={item.id} className={styles.authorItem}>
                                {isEditing ? (
                                    <EditCard id={item.id} onRemove={removeAuthorWork}>
                                        <div className={styles.editRow}>
                                            <span className={styles.editLabel}>Год:</span>
                                            <input
                                                type="number"
                                                value={item.year}
                                                onChange={(e) => updateAuthorWork(item.id, 'year', parseInt(e.target.value))}
                                                className={styles.editInputShort}
                                            />
                                        </div>
                                        <EditField
                                            label="Название"
                                            value={item.title}
                                            onChange={(v) => updateAuthorWork(item.id, 'title', v)}
                                        />
                                        <EditField
                                            label="Тип работы"
                                            value={item.workType}
                                            onChange={(v) => updateAuthorWork(item.id, 'workType', v)}
                                            placeholder="статья / публикация"
                                        />
                                        <EditField
                                            label="Издание"
                                            value={item.publisher}
                                            onChange={(v) => updateAuthorWork(item.id, 'publisher', v)}
                                        />
                                        <div className={styles.editRow}>
                                            <span className={styles.editLabel}>Рецензенты:</span>
                                            <div className={styles.reviewersEdit}>
                                                {item.reviewers.map((reviewer, idx) => (
                                                    <div key={idx} className={styles.reviewerRow}>
                                                        <input
                                                            type="text"
                                                            value={reviewer}
                                                            onChange={(e) => updateReviewer(item.id, idx, e.target.value)}
                                                            className={styles.editInput}
                                                        />
                                                        <button onClick={() => removeReviewer(item.id, idx)} className={styles.smallRemoveButton}>✖</button>
                                                    </div>
                                                ))}
                                                <button onClick={() => addReviewer(item.id)} className={styles.addSmallButton}>+ Добавить рецензента</button>
                                            </div>
                                        </div>
                                        <EditField
                                            label="Ссылка (URL)"
                                            value={item.linkUrl || ''}
                                            onChange={(v) => updateAuthorWork(item.id, 'linkUrl', v)}
                                            placeholder="https://..."
                                        />
                                        <div className={styles.editSubsection}>Файлы:</div>
                                        <EditField
                                            label="Свидетельство (URL)"
                                            value={item.files.certificate?.url || ''}
                                            onChange={(v) => {
                                                setEditData(prev => ({
                                                    ...prev,
                                                    authorWorks: prev.authorWorks.map(work =>
                                                        work.id === item.id ? {
                                                            ...work,
                                                            files: {
                                                                ...work.files,
                                                                certificate: { ...work.files.certificate, url: v, name: 'Свидетельство', size: '182.86 Кб' }
                                                            }
                                                        } : work
                                                    )
                                                }))
                                            }}
                                            placeholder="/files/..."
                                            small
                                        />
                                        <EditField
                                            label="Работа (URL)"
                                            value={item.files.work?.url || ''}
                                            onChange={(v) => {
                                                setEditData(prev => ({
                                                    ...prev,
                                                    authorWorks: prev.authorWorks.map(work =>
                                                        work.id === item.id ? {
                                                            ...work,
                                                            files: {
                                                                ...work.files,
                                                                work: { ...work.files.work, url: v, name: 'Работа', size: '182.86 Кб' }
                                                            }
                                                        } : work
                                                    )
                                                }))
                                            }}
                                            placeholder="/files/..."
                                            small
                                        />
                                        <EditField
                                            label="Сертификат (URL)"
                                            value={item.files.expert?.url || ''}
                                            onChange={(v) => {
                                                setEditData(prev => ({
                                                    ...prev,
                                                    authorWorks: prev.authorWorks.map(work =>
                                                        work.id === item.id ? {
                                                            ...work,
                                                            files: {
                                                                ...work.files,
                                                                expert: { ...work.files.expert, url: v, name: 'Сертификат/экспертное заключение', size: '182.86 Кб' }
                                                            }
                                                        } : work
                                                    )
                                                }))
                                            }}
                                            placeholder="/files/..."
                                            small
                                        />
                                    </EditCard>
                                ) : (
                                    <div className={styles.authorContent}>
                                        <div className={styles.authorHeader}>
                                            <span className={styles.yearBadge}>{item.year}</span>
                                            <span className={styles.authorTitle}>{item.title}</span>
                                            {item.workType && <span className={styles.workType}>: {item.workType}</span>}
                                        </div>
                                        <div className={styles.authorDetails}>
                                            . {item.publisher}. - {item.year}.
                                            {item.reviewers.length > 0 && (
                                                <div className={styles.reviewers}>Рецензент(ы): {item.reviewers.join(', ')}</div>
                                            )}
                                        </div>
                                        {(item.files.certificate?.url || item.files.work?.url || item.files.expert?.url) && (
                                            <div className={styles.filesList}>
                                                {renderFileLink(item.files.certificate)}
                                                {renderFileLink(item.files.work)}
                                                {renderFileLink(item.files.expert)}
                                            </div>
                                        )}
                                        {item.linkUrl && (
                                            <div className={styles.links}>
                                                <a href={item.linkUrl} className={styles.siteLink} target="_blank" rel="noopener noreferrer">Ссылка на ресурс в Internet</a>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        ))}
                    </Section>

                    {isEditing && (
                        <ActionButtons onSave={handleSave} onCancel={handleCancel} />
                    )}
                </div>
            </div>
        </div>
    )
}

export default PublicationsPage