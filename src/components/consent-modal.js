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
            overlayClassName="modal"
            className="dialog"
            config={config}
            onRequestClose={onHideRequest}
            role={isAlert ? 'alertdialog' : 'dialog'}
        >

            <div className="dialog__content">

                <div className={'dialog__header'}>
                    {!isAlert &&
                        <button
                            title={t(['close'])}
                            className={ns('Modal-closeButton')}
                            type="button"
                            onClick={onHideRequest}
                        >
                            <Close t={t} ns={ns} />
                        </button>
                    }

                    <h1 className={ns('Modal-title')} id="orejime-modal-title">{t(['consentModal', 'title'])}</h1>
                    <p className={ns('Modal-description')}>
                        {manager.changed && (config.mustConsent || config.noNotice) &&
                            <p className={ns('Modal-description')}>
                                <strong className={ns('Modal-changes')}>{t(['consentNotice', 'changeDescription'])}</strong>
                            </p>
                        }
                        {t(['consentModal','description'])}&nbsp;
                        {t(['consentModal','privacyPolicy','text'], {
                            privacyPolicy : <a
                                key="privacyPolicyLink"
                                className={ns('Modal-privacyPolicyLink')}
                                onClick={(e) => {onHideRequest()}}
                                href={config.privacyPolicy}
                            >
                                {t(['consentModal','privacyPolicy','name'])}
                            </a>
                        })}
                    </p>
                </div>
                
                <form className="dialog__body">
                    <div className={ns('Modal-body')}>
                        <Apps t={t} ns={ns} config={config} manager={manager} />
                    </div>
                    <div className={ns('Modal-footer')}>
                        <button
                            className={ns('Button Button--save Modal-saveButton')}
                            onClick={onSaveRequest}
                            title={t(['saveData'])}
                        >
                            {t(['save'])}
                        </button>
                    </div>
                </form>

                <div className="dialog__footer">
                    <button
                        className={ns('Button Button--save Modal-saveButton')}
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
