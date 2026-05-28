// src/components/pages/CertificatesPage/CertificatesPage.tsx
import { useCallback } from 'react'
import styles from './CertificatesPage.module.less'
import PageHeader from '../../../components/inputs/PageHeader'
import Section from '../../../components/inputs/Section'
import EditCard from '../../../components/inputs/EditCard'
import EditField from '../../../components/inputs/EditField'
import ActionButtons from '../../../components/inputs/ActionButtons'
import type { Certificate } from '../../../types/info'
import { useEditing } from '../../../utils/hooks/hooks'

type Field = keyof Certificate

const CertificatesPage = () => {
    const {
        handleEdit,
        handleSave,
        handleCancel,
        isEditing,
        viewData: certificates,
        editData: editCertificates,
        setEditData: setEditCertificates
    } = useEditing<Certificate[]>({
        data: []
    })

    const addCertificate = () => {
        const newId = Date.now()
        setEditCertificates(prev => [
            ...prev,
            { id: newId, name: '', date: '', organization: '', link: '' }
        ])
    }

    const updateCertificate = useCallback((id: number, field: Field, value: string) => {
        setEditCertificates(prev =>
            prev.map(cert =>
                cert.id === id ? { ...cert, [field]: value } : cert
            )
        )
    }, [])

    const removeCertificate = useCallback((id: number) => {
        setEditCertificates(prev => prev.filter(cert => cert.id !== id))
    }, [])

    return (
        <div className={styles.container}>
            <div className={styles.card}>
                <PageHeader
                    title="МОИ СЕРТИФИКАТЫ"
                    isEditing={isEditing}
                    onEdit={handleEdit}
                />

                {!isEditing ? (
                    // РЕЖИМ ПРОСМОТРА
                    <div className={styles.viewMode}>
                        <Section title="СЕРТИФИКАТЫ">
                            <div className={styles.infoBlock}>
                                {certificates.length === 0 ? (
                                    <div className={styles.emptyMessage}>Нет сертификатов</div>
                                ) : (
                                    certificates.map((cert) => (
                                        <div key={cert.id} className={styles.infoRow}>
                                            <span className={styles.label}>{cert.date}:</span>
                                            <div className={styles.value}>
                                                <div className={styles.certName}>{cert.name}</div>
                                                <div className={styles.certOrganization}>{cert.organization}</div>
                                                {cert.link && (
                                                    <a href={cert.link} target="_blank" rel="noopener noreferrer" className={styles.siteLink}>
                                                        Ссылка на сертификат
                                                    </a>
                                                )}
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                        </Section>
                    </div>
                ) : (
                    // РЕЖИМ РЕДАКТИРОВАНИЯ
                    <div className={styles.viewMode}>
                        <Section
                            title="СЕРТИФИКАТЫ"
                            isEditing={isEditing}
                            onAdd={addCertificate}
                        >
                            <div className={styles.infoBlock}>
                                {editCertificates.length === 0 ? (
                                    <div className={styles.emptyMessage}>Нажмите "+ Добавить" чтобы создать сертификат</div>
                                ) : (
                                    editCertificates.map((cert) => (
                                        <EditCard key={cert.id} id={cert.id} onRemove={removeCertificate}>
                                            <EditField
                                                label="Название"
                                                value={cert.name}
                                                onChange={(value) => updateCertificate(cert.id, 'name', value)}
                                                placeholder="Название сертификата"
                                            />
                                            <EditField
                                                label="Год получения"
                                                value={cert.date}
                                                onChange={(value) => updateCertificate(cert.id, 'date', value)}
                                                placeholder="Год получения"
                                            />
                                            <EditField
                                                label="Организация"
                                                value={cert.organization}
                                                onChange={(value) => updateCertificate(cert.id, 'organization', value)}
                                                placeholder="Кто выдал"
                                            />
                                            <EditField
                                                label="Ссылка"
                                                value={cert.link || ''}
                                                onChange={(value) => updateCertificate(cert.id, 'link', value)}
                                                placeholder="https://..."
                                            />
                                        </EditCard>
                                    ))
                                )}
                            </div>
                        </Section>

                        <ActionButtons onSave={handleSave} onCancel={handleCancel} />
                    </div>
                )}
            </div>
        </div>
    )
}

export default CertificatesPage