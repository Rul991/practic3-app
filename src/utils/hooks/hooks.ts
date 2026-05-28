import { useState } from "react"
import type { EditingHookOptions } from "../../types/options"

export const useEditing = <T,>({
    data
}: EditingHookOptions<T>) => {
    const [isEditing, setEditing] = useState(false)
    const [viewData, setViewData] = useState<T>(data)
    const [editData, setEditData] = useState<T>(viewData)

    const handleEdit = () => {
        setEditData(viewData)
        setEditing(true)
    }

    const handleSave = () => {
        setViewData(editData)
        setEditing(false)
    }

    const handleCancel = () => {
        setEditData(viewData)
        setEditing(false)
    }

    return {
        handleEdit,
        handleSave,
        handleCancel,
        isEditing,
        viewData,
        setViewData,
        editData,
        setEditData,
    }
}