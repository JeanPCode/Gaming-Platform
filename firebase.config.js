const admin = require('firebase-admin');
const serviceAccount = require('./casino-base-de-datos--casino-firebase-adminsdk-qn3dr-9f9b33c56f.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
})

const db = admin.firestore();
const usersCollection = db.collection('usuario');

//crear un nuevo documento
const createUser = async (id, nombre, apellido, correo) =>{
    const res = await usersCollection.doc(id).set({
        nombre: nombre,
        apellido: apellido,
        correo: correo
    });
    console.log('User created: ',res)
}

//leer un documento
const getUser = async(id) =>{
    const userDoc = await usersCollection.doc(id).get()
    if (userDoc.exists) {
        console.log('No existe el usuario')
    }else console.log('Data del usuario: ', userDoc.data());
}

//actualizar un documento
const updateUser = async (id, newData) => {
    const res = await usersCollection.doc(id).update(newData)
    console.log('Usuario actualizado: ', res);
}

//eliminar el documento
const deleteUser = async (id) => {
    const res = await usersCollection.doc(id).delete()
    console.log('El usuario ha sido eliminado: ', res);
}

createUser('jose' , 'leite' , 'leite@gmail.com')