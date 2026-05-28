import styles from './EducationPage.module.less'
import PageHeader from '../../../components/inputs/PageHeader'
import Section from '../../../components/inputs/Section'
import EditCard from '../../../components/inputs/EditCard'
import EditField from '../../../components/inputs/EditField'
import ActionButtons from '../../../components/inputs/ActionButtons'
import type { CoursesViewData } from '../../../types/info'
import { useEditing } from '../../../utils/hooks/hooks'

const EducationPage = () => {
    const {
        handleEdit,
        handleSave,
        handleCancel,
        isEditing,
        editData,
        setEditData,
    } = useEditing<CoursesViewData>({
        data: {
            selfEducation: [
                { id: 1, year: '2018 / 19г.', fileUrl: '/files/plan1.pdf', fileName: 'Программа / план по самообразованию', fileSize: '182.86 Кб', linkUrl: '' },
                { id: 2, year: '2019 / 20г.', fileUrl: '', fileName: '', fileSize: '', linkUrl: 'https://info.netfolio.ru/' },
                { id: 3, year: '2020 / 21г.', fileUrl: '', fileName: '', fileSize: '', linkUrl: 'https://info.netfolio.ru/' }
            ],
            qualifications: [
                { id: 1, startDate: '09/01/2019', endDate: '03/04/2019', name: 'Демонстративное название программы повышения квалификации', institution: 'Демонстративное учреждение повышения квалификации', hours: 20, studyFormat: 'заочная', fileUrl: '/files/cert1.pdf', fileName: 'Копия документа', fileSize: '182.86 Кб', linkUrl: '' },
                { id: 2, startDate: '05/04/2019', endDate: '07/04/2019', name: 'Демонстрационная программа', institution: 'Демонстрационное учреждения повышения квалификации', hours: 20, studyFormat: 'заочная', fileUrl: '/files/cert2.pdf', fileName: 'Копия документа', fileSize: '182.86 Кб', linkUrl: '' },
                { id: 3, startDate: '10/04/2020', endDate: '23/05/2020', name: 'Демонстративное название программы повышения квалификации 2', institution: 'Демонстративное учреждение повышения квалификации', hours: 100, studyFormat: 'заочная', fileUrl: '/files/cert3.pdf', fileName: 'Копия документа', fileSize: '182.86 Кб', linkUrl: 'https://info.netfolio.ru/' },
                { id: 4, startDate: '02/03/2021', endDate: '11/05/2021', name: 'Демонстративное название программы повышения квалификации 3', institution: 'Демонстративное учреждение повышения квалификации', hours: 25, studyFormat: 'очная', fileUrl: '', fileName: '', fileSize: '', linkUrl: 'https://info.netfolio.ru/' }
            ],
            retraining: [
                { id: 1, startDate: '20/02/2018', endDate: '06/03/2019', name: 'Демонстрационное название программы переподготовки', institution: 'Демонстрационное учреждение профессиональной переподготовки', hours: 50, studyFormat: 'очная', fileUrl: '/files/retrain1.pdf', fileName: 'Копия документа', fileSize: '182.86 Кб', linkUrl: 'https://info.netfolio.ru/' }
            ],
            degrees: [
                { id: 1, date: '05/03/2021', degree: 'кандидат исторических наук', thesisTopic: 'Демонстрационная тема научной работы', fileUrl: '/files/degree1.pdf', fileName: 'Копия документа', fileSize: '182.86 Кб', linkUrl: 'https://info.netfolio.ru/' }
            ]
        }
    })

    const addItem = (section: keyof typeof editData, template: any) => {
        const newId = Date.now()
        setEditData(prev => ({
            ...prev,
            [section]: [...prev[section], { id: newId, ...template }]
        }))
    }

    const updateItem = (section: keyof typeof editData, id: number, field: string, value: any) => {
        setEditData(prev => ({
            ...prev,
            [section]: prev[section].map(item =>
                item.id === id ? { ...item, [field]: value } : item
            )
        }))
    }

    const removeItem = (section: keyof typeof editData, id: number) => {
        setEditData(prev => ({
            ...prev,
            [section]: prev[section].filter(item => item.id !== id)
        }))
    }

    const renderFileLink = (item: any) => {
        if (!item.fileUrl) return null
        return (
            <a href={item.fileUrl} className={styles.fileLink} target="_blank" rel="noopener noreferrer">
                <span className={styles.fileName}>{item.fileName || 'Копия документа'}</span>
                {item.fileSize && <span className={styles.fileInfo}>({item.fileSize})</span>}
            </a>
        )
    }

    const renderWebLink = (item: any) => {
        if (!item.linkUrl) return null
        return (
            <a href={item.linkUrl} className={styles.siteLink} target="_blank" rel="noopener noreferrer">
                Ссылка на ресурс
            </a>
        )
    }

    const renderLinks = (item: any) => (
        <div className={styles.links}>
            {renderFileLink(item)}
            {renderWebLink(item)}
        </div>
    )

    return (
        <div className={styles.container}>
            <div className={styles.card}>
                <PageHeader
                    title="ДОПОЛНИТЕЛЬНОЕ ПРОФЕССИОНАЛЬНОЕ ОБРАЗОВАНИЕ"
                    isEditing={isEditing}
                    onEdit={handleEdit}
                />

                <div className={styles.viewMode}>
                    {/* 1. ПРОГРАММА САМООБРАЗОВАНИЯ */}
                    <Section
                        title="ПРОГРАММА ИЛИ ПЛАН ПО САМООБРАЗОВАНИЮ"
                        isEditing={isEditing}
                        onAdd={() => addItem('selfEducation', { year: '', fileUrl: '', linkUrl: '' })}
                    >
                        {editData.selfEducation.length === 0 && <div className={styles.emptyMessage}>Нет данных</div>}
                        {editData.selfEducation.map(item => (
                            <div key={item.id} className={styles.educationItem}>
                                {isEditing ? (
                                    <EditCard id={item.id} onRemove={(id) => removeItem('selfEducation', id)}>
                                        <EditField
                                            label="Год"
                                            value={item.year}
                                            onChange={(v) => updateItem('selfEducation', item.id, 'year', v)}
                                        />
                                        <EditField
                                            label="Файл (URL)"
                                            value={item.fileUrl || ''}
                                            onChange={(v) => updateItem('selfEducation', item.id, 'fileUrl', v)}
                                            placeholder="/files/doc.pdf"
                                        />
                                        <EditField
                                            label="Ссылка (URL)"
                                            value={item.linkUrl || ''}
                                            onChange={(v) => updateItem('selfEducation', item.id, 'linkUrl', v)}
                                            placeholder="https://..."
                                        />
                                    </EditCard>
                                ) : (
                                    <>
                                        <span className={styles.yearLabel}>{item.year}</span>
                                        <div className={styles.links}>
                                            {renderFileLink(item)}
                                            {renderWebLink(item)}
                                        </div>
                                    </>
                                )}
                            </div>
                        ))}
                    </Section>

                    {/* 2. ПОВЫШЕНИЕ КВАЛИФИКАЦИИ */}
                    <Section
                        title="ПОВЫШЕНИЕ КВАЛИФИКАЦИИ"
                        isEditing={isEditing}
                        onAdd={() => addItem('qualifications', { startDate: '', endDate: '', name: '', institution: '', hours: 0, studyFormat: '' })}
                    >
                        {editData.qualifications.length === 0 && <div className={styles.emptyMessage}>Нет данных</div>}
                        {editData.qualifications.map(item => (
                            <div key={item.id} className={styles.qualificationItem}>
                                {isEditing ? (
                                    <EditCard id={item.id} onRemove={(id) => removeItem('qualifications', id)}>
                                        <div className={styles.editRow}>
                                            <span className={styles.editLabel}>Даты:</span>
                                            <input
                                                type="text"
                                                value={item.startDate}
                                                onChange={(e) => updateItem('qualifications', item.id, 'startDate', e.target.value)}
                                                className={styles.editInputShort}
                                                placeholder="ДД/ММ/ГГГГ"
                                            />
                                            <span>–</span>
                                            <input
                                                type="text"
                                                value={item.endDate}
                                                onChange={(e) => updateItem('qualifications', item.id, 'endDate', e.target.value)}
                                                className={styles.editInputShort}
                                                placeholder="ДД/ММ/ГГГГ"
                                            />
                                        </div>
                                        <EditField
                                            label="Название"
                                            value={item.name}
                                            onChange={(v) => updateItem('qualifications', item.id, 'name', v)}
                                        />
                                        <EditField
                                            label="Учреждение"
                                            value={item.institution}
                                            onChange={(v) => updateItem('qualifications', item.id, 'institution', v)}
                                        />
                                        <div className={styles.editRow}>
                                            <span className={styles.editLabel}>Часы / Формат:</span>
                                            <input
                                                type="number"
                                                value={item.hours}
                                                onChange={(e) => updateItem('qualifications', item.id, 'hours', Number(e.target.value))}
                                                className={styles.editInputSmall}
                                            />
                                            <input
                                                type="text"
                                                value={item.studyFormat}
                                                onChange={(e) => updateItem('qualifications', item.id, 'studyFormat', e.target.value)}
                                                className={styles.editInputMedium}
                                                placeholder="очная / заочная"
                                            />
                                        </div>
                                        <EditField
                                            label="Файл (URL)"
                                            value={item.fileUrl || ''}
                                            onChange={(v) => updateItem('qualifications', item.id, 'fileUrl', v)}
                                        />
                                        <EditField
                                            label="Ссылка (URL)"
                                            value={item.linkUrl || ''}
                                            onChange={(v) => updateItem('qualifications', item.id, 'linkUrl', v)}
                                        />
                                    </EditCard>
                                ) : (
                                    <>
                                        <div className={styles.period}>{item.startDate} – {item.endDate}</div>
                                        <div className={styles.details}>
                                            <strong>{item.name}</strong> ({item.institution}. {item.hours} часов. Форма обучения: {item.studyFormat}).
                                            {renderLinks(item)}
                                        </div>
                                    </>
                                )}
                            </div>
                        ))}
                    </Section>

                    {/* 3. ПРОФЕССИОНАЛЬНАЯ ПЕРЕПОДГОТОВКА */}
                    <Section
                        title="ПРОФЕССИОНАЛЬНАЯ ПЕРЕПОДГОТОВКА"
                        isEditing={isEditing}
                        onAdd={() => addItem('retraining', { startDate: '', endDate: '', name: '', institution: '', hours: 0, studyFormat: '' })}
                    >
                        {editData.retraining.length === 0 && <div className={styles.emptyMessage}>Нет данных</div>}
                        {editData.retraining.map(item => (
                            <div key={item.id} className={styles.qualificationItem}>
                                {isEditing ? (
                                    <EditCard id={item.id} onRemove={(id) => removeItem('retraining', id)}>
                                        <div className={styles.editRow}>
                                            <span className={styles.editLabel}>Даты:</span>
                                            <input
                                                type="text"
                                                value={item.startDate}
                                                onChange={(e) => updateItem('retraining', item.id, 'startDate', e.target.value)}
                                                className={styles.editInputShort}
                                                placeholder="ДД/ММ/ГГГГ"
                                            />
                                            <span>–</span>
                                            <input
                                                type="text"
                                                value={item.endDate}
                                                onChange={(e) => updateItem('retraining', item.id, 'endDate', e.target.value)}
                                                className={styles.editInputShort}
                                                placeholder="ДД/ММ/ГГГГ"
                                            />
                                        </div>
                                        <EditField
                                            label="Название"
                                            value={item.name}
                                            onChange={(v) => updateItem('retraining', item.id, 'name', v)}
                                        />
                                        <EditField
                                            label="Учреждение"
                                            value={item.institution}
                                            onChange={(v) => updateItem('retraining', item.id, 'institution', v)}
                                        />
                                        <div className={styles.editRow}>
                                            <span className={styles.editLabel}>Часы / Формат:</span>
                                            <input
                                                type="number"
                                                value={item.hours}
                                                onChange={(e) => updateItem('retraining', item.id, 'hours', Number(e.target.value))}
                                                className={styles.editInputSmall}
                                            />
                                            <input
                                                type="text"
                                                value={item.studyFormat}
                                                onChange={(e) => updateItem('retraining', item.id, 'studyFormat', e.target.value)}
                                                className={styles.editInputMedium}
                                                placeholder="очная / заочная"
                                            />
                                        </div>
                                        <EditField
                                            label="Файл (URL)"
                                            value={item.fileUrl || ''}
                                            onChange={(v) => updateItem('retraining', item.id, 'fileUrl', v)}
                                        />
                                        <EditField
                                            label="Ссылка (URL)"
                                            value={item.linkUrl || ''}
                                            onChange={(v) => updateItem('retraining', item.id, 'linkUrl', v)}
                                        />
                                    </EditCard>
                                ) : (
                                    <>
                                        <div className={styles.period}>{item.startDate} – {item.endDate}</div>
                                        <div className={styles.details}>
                                            <strong>{item.name}</strong> ({item.institution}. {item.hours} часов. Форма обучения: {item.studyFormat}).
                                            {renderLinks(item)}
                                        </div>
                                    </>
                                )}
                            </div>
                        ))}
                    </Section>

                    {/* 4. ПОЛУЧЕНИЕ УЧЕНОЙ СТЕПЕНИ */}
                    <Section
                        title="ПОЛУЧЕНИЕ УЧЕНОЙ СТЕПЕНИ"
                        isEditing={isEditing}
                        onAdd={() => addItem('degrees', { date: '', degree: '', thesisTopic: '', fileUrl: '', linkUrl: '' })}
                    >
                        {editData.degrees.length === 0 && <div className={styles.emptyMessage}>Нет данных</div>}
                        {editData.degrees.map(item => (
                            <div key={item.id} className={styles.degreeItem}>
                                {isEditing ? (
                                    <EditCard id={item.id} onRemove={(id) => removeItem('degrees', id)}>
                                        <EditField
                                            label="Дата"
                                            value={item.date}
                                            onChange={(v) => updateItem('degrees', item.id, 'date', v)}
                                            placeholder="ДД/ММ/ГГГГ"
                                        />
                                        <EditField
                                            label="Степень"
                                            value={item.degree}
                                            onChange={(v) => updateItem('degrees', item.id, 'degree', v)}
                                        />
                                        <EditField
                                            label="Тема"
                                            value={item.thesisTopic}
                                            onChange={(v) => updateItem('degrees', item.id, 'thesisTopic', v)}
                                        />
                                        <EditField
                                            label="Файл (URL)"
                                            value={item.fileUrl || ''}
                                            onChange={(v) => updateItem('degrees', item.id, 'fileUrl', v)}
                                        />
                                        <EditField
                                            label="Ссылка (URL)"
                                            value={item.linkUrl || ''}
                                            onChange={(v) => updateItem('degrees', item.id, 'linkUrl', v)}
                                        />
                                    </EditCard>
                                ) : (
                                    <>
                                        <div className={styles.degreeDate}>{item.date}</div>
                                        <div className={styles.degreeDetails}>
                                            <strong>{item.degree}</strong>. Тема: {item.thesisTopic}.
                                            {renderLinks(item)}
                                        </div>
                                    </>
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

export default EducationPage