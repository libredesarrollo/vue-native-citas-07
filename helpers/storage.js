
// import { AsyncStorage } from "react-native"

import AsyncStorage from '@react-native-async-storage/async-storage';

const KEY = "CITE"


export const storeSetCite = async (cite) => { // objecto parametro
    try {
        // TODAS las citas
        const cites = await storeGetCites()

        if (cite.id == "" || cite.id == undefined) {
            // no existe - crear
            cite.id = Date.now()
            cites.push(cite)
        } else {
            // existe - actualizar
            cites.find((c, index, array) => {
                if(c.id == cite.id) {
                    c.name = cite.name
                    c.surname = cite.surname
                    c.age = cite.age
                    c.description = cite.description
                    c.state = cite.state
                    c.sex = cite.sex
                }
            })
        }

        // guardamos en el stoarage
        await AsyncStorage.setItem(KEY, JSON.stringify(cites))

    } catch (error) {
        console.log(error)
    }
}

export const storeGetCites = async () => {
    try {
        const cites = await AsyncStorage.getItem(KEY)

        if (cites !== null) {
            return JSON.parse(cites)
        }

    } catch (error) {
        console.log(error)
    }

    return [];
}

export const storeDeleteCite = async (cite) => {

    const cites = await storeGetCites()

    cites.find((c, index, array) => {
        if(c != undefined && c.id == cite.id) {
            array.splice(index, 1)
        }
    })

    await AsyncStorage.setItem(KEY, JSON.stringify(cites))
}