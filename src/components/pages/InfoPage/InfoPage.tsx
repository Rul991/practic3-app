// src/components/pages/InfoPage/InfoPage.tsx
import { useState, useCallback } from 'react'
import styles from './InfoPage.module.less'
import PageHeader from '../../../components/inputs/PageHeader'
import Section from '../../../components/inputs/Section'
import EditCard from '../../../components/inputs/EditCard'
import EditField from '../../../components/inputs/EditField'
import ActionButtons from '../../../components/inputs/ActionButtons'
import type { Award, Experience, UserData } from '../../../types/info'

const InfoPage = () => {
    const [isEditing, setIsEditing] = useState(false)
    
    // Данные пользователя
    const [formData, setFormData] = useState<UserData>({
        fullName: 'Демонстрационный педагог СПО',
        educationLevel: 'Высшее профессиональное образование - специалитет, магистратура',
        university: 'Демонстрационный ВУЗ, Педагогический факультет (09/06/1994)',
        universityLink: '',
        qualificationCategory: 'высшая категория (Присвоена 01/04/2015)',
        qualificationFile: '',
        professionalInterests: 'Профессиональные интересы педагога',
        address: 'Российская Федерация, г. Москва',
        email: 'info@netfollo.ru',
        website: 'netfollo.ru',
        phone: '+7(000)0000012',
        experiences: [
            { id: 1, period: '01/08/1998 – 31/05/2001', place: 'Демонстрационный детский сад. Воспитатель.' },
            { id: 2, period: '01/09/2001 – НАСТОЯЩЕЕ ВРЕМЯ', place: 'Демонстрационный детский сад. Воспитатель.' }
        ],
        awards: [
            { id: 1, date: '11/05/2021', name: 'Демонстрационная награда', link: '' },
            { id: 2, date: '05/05/2021', name: 'Демонстрационное поощрение', link: '' }
        ]
    })

    const [editData, setEditData] = useState(formData)

    const handleEdit = () => {
        setEditData(formData)
        setIsEditing(true)
    }

    const handleSave = () => {
        setFormData(editData)
        setIsEditing(false)
    }

    const handleCancel = () => {
        setEditData(formData)
        setIsEditing(false)
    }

    // Функции для работы со стажем
    const addExperience = () => {
        const newId = Date.now().toString()
        setEditData((prev: any) => ({
            ...prev,
            experiences: [...prev.experiences, { id: newId, period: '', place: '' }]
        }))
    }

    const updateExperience = useCallback((id: number, field: keyof Experience, value: string) => {
        setEditData((prev: any) => ({
            ...prev,
            experiences: prev.experiences.map((exp: Experience) =>
                exp.id === id ? { ...exp, [field]: value } : exp
            )
        }))
    }, [])

    const removeExperience = useCallback((id: number) => {
        setEditData((prev: any) => ({
            ...prev,
            experiences: prev.experiences.filter((exp: Experience) => exp.id !== id)
        }))
    }, [])

    const addAward = () => {
        const newId = Date.now().toString()
        setEditData((prev: any) => ({
            ...prev,
            awards: [...prev.awards, { id: newId, date: '', name: '', link: '' }]
        }))
    }

    const updateAward = useCallback((id: number, field: keyof Award, value: string) => {
        setEditData((prev: any) => ({
            ...prev,
            awards: prev.awards.map((award: Award) =>
                award.id === id ? { ...award, [field]: value } : award
            )
        }))
    }, [])

    const removeAward = useCallback((id: number) => {
        setEditData((prev: any) => ({
            ...prev,
            awards: prev.awards.filter((award: Award) => award.id !== id)
        }))
    }, [])

    return (
        <div className={styles.container}>
            <div className={styles.card}>
                <PageHeader 
                    title="ОСНОВНЫЕ СВЕДЕНИЯ"
                    isEditing={isEditing}
                    onEdit={handleEdit}
                />

                {!isEditing ? (
                    // РЕЖИМ ПРОСМОТРА
                    <div className={styles.viewMode}>
                        {/* ЛИЧНЫЕ ДАННЫЕ */}
                        <Section title="ЛИЧНЫЕ ДАННЫЕ">
                            <div className={styles.infoBlock}>
                                <div className={styles.infoRow}>
                                    <span className={styles.label}>ФИО:</span>
                                    <span className={styles.value}>{formData.fullName}</span>
                                </div>
                                
                                <div className={styles.infoRow}>
                                    <span className={styles.label}>ОБРАЗОВАНИЕ:</span>
                                    <div className={styles.value}>
                                        <div>{formData.educationLevel}</div>
                                        <div>{formData.university}</div>
                                        {formData.universityLink && (
                                            <a href={formData.universityLink} target="_blank" rel="noopener noreferrer">
                                                Ссылка на ресурс
                                            </a>
                                        )}
                                    </div>
                                </div>
                                
                                <div className={styles.infoRow}>
                                    <span className={styles.label}>КВАЛИФИКАЦИОННАЯ КАТЕГОРИЯ:</span>
                                    <div className={styles.value}>
                                        <div>{formData.qualificationCategory}</div>
                                        {formData.qualificationFile && (
                                            <a href={formData.qualificationFile} target="_blank" rel="noopener noreferrer">
                                                Аттестационный лист (PDF)
                                            </a>
                                        )}
                                    </div>
                                </div>
                                
                                <div className={styles.infoRow}>
                                    <span className={styles.label}>ПРОФЕССИОНАЛЬНЫЕ ИНТЕРЕСЫ:</span>
                                    <span className={styles.value}>{formData.professionalInterests}</span>
                                </div>
                            </div>
                        </Section>

                        {/* КОНТАКТ */}
                        <Section title="КОНТАКТ">
                            <div className={styles.infoBlock}>
                                <div className={styles.infoRow}>
                                    <span className={styles.label}>АДРЕС:</span>
                                    <span className={styles.value}>{formData.address}</span>
                                </div>
                                
                                <div className={styles.infoRow}>
                                    <span className={styles.label}>E-MAIL:</span>
                                    <span className={styles.value}>{formData.email}</span>
                                </div>
                                
                                <div className={styles.infoRow}>
                                    <span className={styles.label}>Сайт:</span>
                                    <a href={`http://${formData.website}`} target="_blank" rel="noopener noreferrer" className={styles.value}>
                                        {formData.website}
                                    </a>
                                </div>
                                
                                <div className={styles.infoRow}>
                                    <span className={styles.label}>ТЕЛЕФОН:</span>
                                    <span className={styles.value}>{formData.phone}</span>
                                </div>
                            </div>
                        </Section>

                        {/* СТАЖ */}
                        <Section title="СТАЖ">
                            <div className={styles.infoBlock}>
                                {formData.experiences.map((exp: Experience) => (
                                    <div key={exp.id} className={styles.experienceItem}>
                                        <div className={styles.experienceDate}>{exp.period}</div>
                                        <div className={styles.experiencePlace}>{exp.place}</div>
                                    </div>
                                ))}
                                {formData.experiences.length === 0 && (
                                    <div className={styles.emptyMessage}>Нет записей о стаже</div>
                                )}
                            </div>
                        </Section>

                        {/* НАГРАДЫ */}
                        <Section title="НАГРАДЫ И ПООЩРЕНИЯ">
                            <div className={styles.infoBlock}>
                                {formData.awards.map((award: Award) => (
                                    <div key={award.id} className={styles.awardItem}>
                                        <div className={styles.awardDate}>{award.date}</div>
                                        <div className={styles.awardName}>{award.name}</div>
                                        {award.link && (
                                            <a href={award.link} target="_blank" rel="noopener noreferrer">Ссылка на ресурс</a>
                                        )}
                                    </div>
                                ))}
                                {formData.awards.length === 0 && (
                                    <div className={styles.emptyMessage}>Нет записей о наградах</div>
                                )}
                            </div>
                        </Section>
                    </div>
                ) : (
                    // РЕЖИМ РЕДАКТИРОВАНИЯ
                    <div className={styles.viewMode}>
                        {/* ЛИЧНЫЕ ДАННЫЕ */}
                        <Section title="ЛИЧНЫЕ ДАННЫЕ">
                            <div className={styles.infoBlock}>
                                <EditField 
                                    label="ФИО" 
                                    value={editData.fullName} 
                                    onChange={(v) => setEditData((prev: any) => ({ ...prev, fullName: v }))}
                                />
                                
                                <div className={styles.editRow}>
                                    <span className={styles.editLabel}>ОБРАЗОВАНИЕ:</span>
                                    <div className={styles.editColumn}>
                                        <input
                                            className={styles.editInput}
                                            value={editData.educationLevel}
                                            onChange={(e) => setEditData((prev: any) => ({ ...prev, educationLevel: e.target.value }))}
                                            placeholder="Уровень образования"
                                        />
                                        <input
                                            className={styles.editInput}
                                            value={editData.university}
                                            onChange={(e) => setEditData((prev: any) => ({ ...prev, university: e.target.value }))}
                                            placeholder="ВУЗ, факультет, год окончания"
                                            style={{ marginTop: '8px' }}
                                        />
                                        <input
                                            className={styles.editInput}
                                            value={editData.universityLink}
                                            onChange={(e) => setEditData((prev: any) => ({ ...prev, universityLink: e.target.value }))}
                                            placeholder="Ссылка на ресурс"
                                            style={{ marginTop: '8px' }}
                                        />
                                    </div>
                                </div>
                                
                                <div className={styles.editRow}>
                                    <span className={styles.editLabel}>КВАЛИФИКАЦИОННАЯ КАТЕГОРИЯ:</span>
                                    <div className={styles.editColumn}>
                                        <input
                                            className={styles.editInput}
                                            value={editData.qualificationCategory}
                                            onChange={(e) => setEditData((prev: any) => ({ ...prev, qualificationCategory: e.target.value }))}
                                        />
                                        <input
                                            className={styles.editInput}
                                            value={editData.qualificationFile}
                                            onChange={(e) => setEditData((prev: any) => ({ ...prev, qualificationFile: e.target.value }))}
                                            placeholder="Ссылка на аттестационный лист"
                                            style={{ marginTop: '8px' }}
                                        />
                                    </div>
                                </div>
                                
                                <EditField 
                                    label="ПРОФЕССИОНАЛЬНЫЕ ИНТЕРЕСЫ" 
                                    value={editData.professionalInterests} 
                                    onChange={(v) => setEditData((prev: any) => ({ ...prev, professionalInterests: v }))}
                                />
                            </div>
                        </Section>

                        {/* КОНТАКТ */}
                        <Section title="КОНТАКТ">
                            <div className={styles.infoBlock}>
                                <EditField 
                                    label="АДРЕС" 
                                    value={editData.address} 
                                    onChange={(v) => setEditData((prev: any) => ({ ...prev, address: v }))}
                                />
                                <EditField 
                                    label="E-MAIL" 
                                    value={editData.email} 
                                    onChange={(v) => setEditData((prev: any) => ({ ...prev, email: v }))}
                                    type="email"
                                />
                                <EditField 
                                    label="Сайт" 
                                    value={editData.website} 
                                    onChange={(v) => setEditData((prev: any) => ({ ...prev, website: v }))}
                                />
                                <EditField 
                                    label="ТЕЛЕФОН" 
                                    value={editData.phone} 
                                    onChange={(v) => setEditData((prev: any) => ({ ...prev, phone: v }))}
                                    type="tel"
                                />
                            </div>
                        </Section>

                        {/* СТАЖ */}
                        <Section 
                            title="СТАЖ"
                            isEditing={isEditing}
                            onAdd={addExperience}
                        >
                            <div className={styles.infoBlock}>
                                {editData.experiences.length === 0 ? (
                                    <div className={styles.emptyMessage}>Нажмите "+ Добавить" чтобы добавить стаж</div>
                                ) : (
                                    editData.experiences.map((exp: Experience) => (
                                        <EditCard key={exp.id} id={exp.id} onRemove={removeExperience}>
                                            <div className={styles.editFieldGroup}>
                                                <span className={styles.editLabel}>Период:</span>
                                                <input
                                                    className={styles.editInput}
                                                    value={exp.period}
                                                    onChange={(e) => updateExperience(exp.id, 'period', e.target.value)}
                                                    placeholder="Например: 01/09/2001 – НАСТОЯЩЕЕ ВРЕМЯ"
                                                />
                                            </div>
                                            <div className={styles.editFieldGroup}>
                                                <span className={styles.editLabel}>Место работы:</span>
                                                <input
                                                    className={styles.editInput}
                                                    value={exp.place}
                                                    onChange={(e) => updateExperience(exp.id, 'place', e.target.value)}
                                                    placeholder="Например: Демонстрационный детский сад. Воспитатель."
                                                />
                                            </div>
                                        </EditCard>
                                    ))
                                )}
                            </div>
                        </Section>

                        {/* НАГРАДЫ */}
                        <Section 
                            title="НАГРАДЫ И ПООЩРЕНИЯ"
                            isEditing={isEditing}
                            onAdd={addAward}
                        >
                            <div className={styles.infoBlock}>
                                {editData.awards.length === 0 ? (
                                    <div className={styles.emptyMessage}>Нажмите "+ Добавить" чтобы добавить награду</div>
                                ) : (
                                    editData.awards.map((award: Award) => (
                                        <EditCard key={award.id} id={award.id} onRemove={removeAward}>
                                            <div className={styles.editFieldGroup}>
                                                <span className={styles.editLabel}>Дата:</span>
                                                <input
                                                    className={styles.editInput}
                                                    value={award.date}
                                                    onChange={(e) => updateAward(award.id, 'date', e.target.value)}
                                                    placeholder="Например: 11/05/2021"
                                                />
                                            </div>
                                            <div className={styles.editFieldGroup}>
                                                <span className={styles.editLabel}>Название:</span>
                                                <input
                                                    className={styles.editInput}
                                                    value={award.name}
                                                    onChange={(e) => updateAward(award.id, 'name', e.target.value)}
                                                    placeholder="Например: Почетная грамота"
                                                />
                                            </div>
                                            <div className={styles.editFieldGroup}>
                                                <span className={styles.editLabel}>Ссылка:</span>
                                                <input
                                                    className={styles.editInput}
                                                    value={award.link}
                                                    onChange={(e) => updateAward(award.id, 'link', e.target.value)}
                                                    placeholder="https://..."
                                                />
                                            </div>
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

export default InfoPage