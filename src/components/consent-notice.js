import React from 'react'
import {getPurposes} from '../utils/config'

export default class ConsentNotice extends React.Component {
    render() {
        const {
            config,
            manager,
            isModalVisible,
            isMandatory,
            t,
            ns,
            onSaveRequest,
            onDeclineRequest,
            onConfigRequest
        } = this.props

        const purposes = getPurposes(config)
        const purposesText = purposes.map((purpose) => t(['purposes', purpose])).join(", ")
        const title = t(['consentNotice', 'title']);

        return <div aria-hidden={isModalVisible} className={ns(`notice${isMandatory ? ' notice--mandatory' : ''}`)}>
            
            {config.logo &&
                <div className={ns('notice__logo')}>
                    <img
                        src={typeof config.logo == 'object' ? config.logo.src : config.logo}
                        alt={typeof config.logo == 'object' && config.logo.alt ? config.logo.alt : ''} className={ns('Notice-logo')}
                    />
                </div>
            }

            <div className={ns('notice__text')}>
                {title &&
                    <h1 className={ns('notice-title')} id="orejime-notice-title">{title}</h1>
                }

                <p className={ns('notice-description')}>
                    {t(['consentNotice', 'description'], {
                        purposes: <strong key="purposes" className={ns('notice-purposes')}>{purposesText}</strong>
                    })}
                    {t(['consentNotice','privacyPolicy','text'], {
                        privacyPolicy : <a
                            key="privacyPolicyLink"
                            className={ns('notice-link')}
                            href={config.privacyPolicy}
                        >
                            {t(['consentNotice','privacyPolicy','name'])}
                        </a>
                    })}
                </p>
            </div>

            {manager.changed &&
                <p className={ns('notice-changes')}>{t(['consentNotice', 'changeDescription'])}</p>
            }

            <ul className={ns('notice__actions')}>
                <li className={ns('notice__actions__item notice__actions__item--save')}>
                        <button
                        className="button button--primary"
                        type="button"
                        onClick={onSaveRequest}
                    >
                        {t(['accept'])}
                    </button>
                </li>
                <li className={ns('notice__actions__item notice__actions__item--decline')}>
                        <button
                        className="button button--default"
                        type="button"
                        onClick={onDeclineRequest}
                    >
                        {t(['decline'])}
                    </button>
                </li>
                <li className={ns('notice__actions__item notice__actions__item--info')}>
                        <button
                        type="button"
                        className="button"
                        onClick={onConfigRequest}
                    >
                        {t(['consentNotice', 'learnMore'])}
                    </button>
                </li>
            </ul>
        </div>
    }
}
