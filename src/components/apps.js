import React from 'react'
import {getPurposes} from '../utils/config'
import AppItem from './app-item'

export default class Apps extends React.Component {
    constructor(props, context){
        super(props, context)
        props.manager.watch(this)
        this.state = {
            consents : props.manager.consents
        }
    }

    componentWillUnmount(){
        const {manager} = this.props
        manager.unwatch(this)
    }

    update(obj, type, data){
        const {manager} = this.props
        if (obj == manager && type == 'consents')
            this.setState({consents : data})
    }

    render(){
        const {config, t, ns, manager} = this.props
        const {consents} = this.state
        const {apps} = config

        const toggle = (apps, value) => {
            apps.map((app)=>{
                manager.updateConsent(app, value)
            })
        }

        const toggleAll = (value) => {
            toggle(apps, value)
        }
        const enableAll = () => toggleAll(true)
        const disableAll = () => toggleAll(false)

        const appItems = apps.map((app, key) => {
            const toggleApp = (value) => {
                toggle([app], value)
            }
            const checked = consents[app.name]
            return <li key={`app-${app.name}`} className={ns(`apps__list__item apps__list__item--${app.name}`)}>
                <AppItem
                    checked={checked || app.required}
                    onToggle={toggleApp}
                    t={t}
                    ns={ns}
                    {...app}
                />
            </li>
        })
        const allDisabled = apps.filter((app) => {
            return (app.required || false)
                ? false
                : consents[app.name]
        }).length === 0
        const allEnabled = apps.filter((app) => {
            return consents[app.name]
        }).length === apps.length

        return <div className={ns('apps')}>
            <div className={ns('apps__toggles')}>
                <button
                    type="button"
                    className="button button--default"
                    disabled={allEnabled}
                    onClick={enableAll}
                >
                    {t(['acceptAll'])}
                </button>
                <button
                    type="button"
                    className="button button--default"
                    disabled={allDisabled}
                    onClick={disableAll}
                >
                    {t(['declineAll'])}
                </button>
            </div>
            <ul className={ns('apps__list')}>
                {appItems}
            </ul>
        </div>
    }
}
