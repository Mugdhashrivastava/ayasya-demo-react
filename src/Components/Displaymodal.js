import React from 'react';
import { useState } from 'react';
import styles from './Displaymodal.module.css'

export default function DisplayModal({ values }) {

    const [check, setCheck] = useState(false);
    const checkHandler = (value) => {
        setCheck(value)
    }
    if (check) {
        console.log('check')
    }
    if (!check) {
        console.log('uncheck')
    }

    return (
        <>
            {values.map((element, index) => (
                <div key={index} className={styles.customcontainer} onChange={(event) => (checkHandler(event.target.value))}>
                    <input type='checkbox' className={styles.customcheckbox} />
                    <h6 className={styles.customtitle}>{element.title}</h6>
                    <div className={styles.custombody}>{element.body}</div>
                </div>
            ))}
        </>
    );
}
