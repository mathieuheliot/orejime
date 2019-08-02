import React from 'react'

export default class AppItem extends React.Component {

    render(){
        const {checked, onToggle, name, title, description, t, ns} = this.props
        const required = this.props.required || false
        const optOut = this.props.optOut || false
        const purposes = this.props.purposes || []
        const onChange = (e) => {
            onToggle(e.target.checked)
        }
        const id = `orejime-app-item-${name}`
        const isChecked = checked || required
        const purposesText = purposes.map((purpose) => t(['purposes', purpose])).join(", ")
        const optOutText = optOut
            ? <span
                className={ns('app-optOut')}
                title={t(['app', 'optOut', 'description'])}
            >
                {t(['app', 'optOut', 'title'])}
            </span>
            : ''
        const requiredText = required
            ? <span
                className={ns('app-required')}
                title={t(['app', 'required', 'description'])}
            >
                {t(['app', 'required', 'title'])}
            </span>
            : ''

        const purposesEl = purposes.length > 0
            ? <p className={ns('app-purposes')}>
                {purposesText}
            </p>
            : null
        const switchLabel = isChecked ? 'enabled' : 'disabled'
        return <div className={ns('app')}>
            <div className="switch">
                <input
                    id={id}
                    aria-describedby={`${id}-description`}
                    disabled={required}
                    checked={isChecked}
                    type="checkbox"
                    onChange={onChange}
                />
                <label
                    htmlFor={id}
                    {...(required ? {tabIndex: "0"} : {})}
                >
                    <div className={ns('app-title')}>{title}{requiredText}{optOutText}</div>
                    <div class="app-description">{description || t([name, 'description'])}</div>
                    {purposesEl}
                </label>
            </div>
        </div>
    }

}