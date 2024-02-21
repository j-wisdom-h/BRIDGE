import React, { useState } from 'react'

function UserInfoForm({ userInfo, onUpdateUserInfo }) {
    const [editedUserInfo, setEditedUserInfo] = useState(userInfo)
    const [editMode, setEditMode] = useState({
        role: false,
        nickname: false,
        introduction: false,
        allowChat: false,
    })

    const handleEdit = (field) => {
        setEditMode({ ...editMode, [field]: true })
    }

    const handleSave = () => {
        onUpdateUserInfo(editedUserInfo)
        setEditMode({
            role: false,
            nickname: false,
            introduction: false,
            allowChat: false,
        })
    }

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target
        const newValue = type === 'checkbox' ? checked : value
        setEditedUserInfo({ ...editedUserInfo, [name]: newValue })
    }

    const renderField = (fieldName, label) => {
        return (
            <div key={fieldName}>
                <label>
                    {label}:
                    {editMode[fieldName] ? (
                        <>
                            <input
                                type={
                                    fieldName === 'allowChat'
                                        ? 'checkbox'
                                        : 'text'
                                }
                                name={fieldName}
                                value={
                                    fieldName === 'allowChat'
                                        ? editedUserInfo[fieldName]
                                        : editedUserInfo[fieldName]
                                }
                                checked={
                                    fieldName === 'allowChat'
                                        ? editedUserInfo[fieldName]
                                        : null
                                }
                                onChange={handleChange}
                            />
                            <button type="button" onClick={handleSave}>
                                Save
                            </button>
                        </>
                    ) : (
                        <>
                            {fieldName === 'allowChat'
                                ? editedUserInfo[fieldName]
                                    ? 'Yes'
                                    : 'No'
                                : editedUserInfo[fieldName]}
                            <button
                                type="button"
                                onClick={() => handleEdit(fieldName)}
                            >
                                Edit
                            </button>
                        </>
                    )}
                </label>
            </div>
        )
    }

    const fields = [
        { fieldName: 'role', label: 'Role' },
        { fieldName: 'nickname', label: 'Nickname' },
        { fieldName: 'introduction', label: 'Introduction' },
        { fieldName: 'allowChat', label: 'Allow Chat' },
    ]

    return (
        <form>
            {fields.map((field) => renderField(field.fieldName, field.label))}
        </form>
    )
}

export default UserInfoForm
