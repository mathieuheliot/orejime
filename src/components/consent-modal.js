import React from 'react'
import {Close} from './icons'
import Apps from './apps'
import Dialog from './dialog'

export default class ConsentModal extends React.Component {
    render() {
        const {isOpen, onHideRequest, onSaveRequest, config, manager, t, ns} = this.props

        const isAlert = config.mustConsent && (!manager.confirmed || manager.changed)

        return <Dialog
            isOpen={isOpen}
            aria={{'labelledby': 'orejime-modal-title'}}
            portalClassName={ns('ModalPortal')}
            overlayClassName={isOpen ? 'modal visible' : 'modal'}
            className="dialog"
            config={config}
            onRequestClose={onHideRequest}
            role={isAlert ? 'alertdialog' : 'dialog'}
        >

            {!isAlert &&
                <div className="dialog__close">
                    <button
                        title={t(['close'])}
                        className={ns('modal-close')}
                        type="button"
                        onClick={onHideRequest}
                    >Close</button>
                </div>
            }

            <div className="dialog__content">

                <div className="dialog__header">
                    <h1 className={ns('modal-title')} id="orejime-modal-title">{t(['consentModal', 'title'])}</h1>
                    <p className={ns('modal-description')}>
                        {manager.changed && (config.mustConsent || config.noNotice) &&
                            <p className={ns('modal-description')}>
                                <strong className={ns('Modal-changes')}>{t(['consentNotice', 'changeDescription'])}</strong>
                            </p>
                        }
                        {t(['consentModal','description'])}&nbsp;
                        {t(['consentModal','privacyPolicy','text'], {
                            privacyPolicy : <a
                                key="privacyPolicyLink"
                                className="link"
                                onClick={(e) => {onHideRequest()}}
                                href={config.privacyPolicy}
                            >
                                {t(['consentModal','privacyPolicy','name'])}
                            </a>
                        })}
                    </p>
                </div>
                
                <div className="dialog__body">
                    <form className={ns('form')}>
                        <Apps t={t} ns={ns} config={config} manager={manager} />
                    </form>
                </div>

                <div className="dialog__footer">
                    <button
                        className="button button--primary"
                        onClick={onSaveRequest}
                        title={t(['saveData'])}
                    >
                        {t(['save'])}
                    </button>
                </div>

            </div>
        </Dialog>
    }
}
