import React from 'react'
import { Button } from 'libs'

const Content = (props) => {
    const { handleModalAddEdit, schoolList } = props

    return (
        <div className='content'>
            <div className='level'>
                <div className='level-left is-size-4 has-text-weight-medium'>
                    Daftar Sekolah
                </div>
                <div className='level-right'>
                    <Button
                        className='is-info is-light'
                        onClick={() => handleModalAddEdit('ADD')}
                    >
                        Tambah Sekolah
                    </Button>
                </div>
            </div>
            {schoolList.length > 0 ? (
                <table className='table is-striped is-narrow is-hoverable is-fullwidth is-margin-top'>
                    <thead>
                        <tr>
                            <th>Nama</th>
                            <th>Latitude</th>
                            <th>Longitude</th>
                        </tr>
                    </thead>
                    <tbody>
                        {schoolList.map((item, index) => (
                            <tr key={index}>
                                <td>{item.name}</td>
                                <td>{item.lat}</td>
                                <td>{item.lngt}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>Tidak ada data</p>
            )}
        </div>
    )
}

export default Content
