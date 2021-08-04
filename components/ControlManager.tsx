import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { initControlStorage } from '../services/actions/controlActions'

const ControlManager = () => {

    const dispatch = useDispatch()

    useEffect(() => {

        dispatch(initControlStorage())

    }, [dispatch])

    return null
}

export default ControlManager