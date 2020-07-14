import React, { useEffect } from 'react'
import classnames from 'classnames'
import { Button } from 'libs'

const Modal = (props) => {
    const {
        children,
        className,
        title,
        titleClassName,
        onPositiveButton,
        onNegativeButton,
        onNegativeButton2,
        positiveButtonTitle,
        negativeButtonTitle,
        negativeButtonTitle2,
        isShow
    } = props
    const classes = classnames('modal', isShow && 'is-active', className)
    const titleClasses = classnames('modal-card-title', titleClassName)

    useEffect(() => {
        if (isShow) {
            document.getElementsByTagName('html')[0].classList.add('is-clipped')
        } else {
            document
                .getElementsByTagName('html')[0]
                .classList.remove('is-clipped')
        }
    }, [isShow])

    return (
        <div className={classes} style={{ zIndex: 1001 }}>
            <div className='modal-background'></div>
            <div className='modal-card'>
                <header className='modal-card-head'>
                    <p className={titleClasses}>{title}</p>
                </header>
                <section className='modal-card-body'>{children}</section>
                <footer className='modal-card-foot'>
                    <Button className='button is-success' onClick={onPositiveButton}>
                        {positiveButtonTitle}
                    </Button>
                    <Button className='button' onClick={onNegativeButton}>
                        {negativeButtonTitle}
                    </Button>
                    <Button className='button is-light is-danger' onClick={onNegativeButton2}>
                        {negativeButtonTitle2}
                    </Button>
                </footer>
            </div>
        </div>
    )
}

export default Modal
