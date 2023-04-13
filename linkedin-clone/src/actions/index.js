import { auth, provider, storage, db } from '../firebase';
import { SET_USER, SET_LOADING_STATUS, GET_ARTICLES } from '../actions/actionType';

export const setUser = (payload) => ({
    type: SET_USER,
    user: payload,
});

export const setLoading = (status) => ({
    type: SET_LOADING_STATUS,
    status: status,
})

export const getArticles = (payload) =>({
    type: GET_ARTICLES,
    payload:payload,
})

export function signInAPI() {
    return (dispatch) => {
        auth.signInWithPopup(provider).then((payload) => {
            // console.log(payload.user);
            dispatch(setUser(payload.user));
        }).catch((error) => alert(error.message));
    };
}

export function getUserAuth() {
    return (dispatch) => {
        auth.onAuthStateChanged(async (user) => {
            if (user) {
                dispatch(setUser(user));
            }
        })
    }
}

export function signOutAPI() {
    return (dispatch) => {
        auth
            .signOut()
            .then(() => {
                dispatch(setUser(null));
            })
            .catch((error) => {
                console.log(error.message);
            })
    }
}

// export function postArticleAPI(payload) {
//     return (dispatch) => {
//         if (payload.image !== "") {
//             const upload = storage
//                 .ref(`images/${payload.image.name}`)
//                 .put(payload.image);
//             upload.on("state_changed", (snapshot) => {
//                 const progress = (
//                     (snapshot.bytesTransferred / snapshot.totalBytes) * 100);
//                 console.log(`Progress: ${progress}%`);

//                 if (snapshot.state === 'RUNNING') {
//                     console.log(`Progress: ${progress}%`);
//                 }
//             }, error => console.log(error.code),
//                 async () => {
//                     const downloadURL = await upload.snapshot.ref.getDownloadURL();
//                     db.collection("articles").add({
//                         actor: {
//                             description: payload.user.email,
//                             title: payload.user.displayName,
//                             date: payload.timeStamp,
//                             image: payload.user.photoURL
//                         },
//                         video: payload.video,
//                         shareImg: downloadURL,
//                         comments: 0,
//                         description: payload.description,
//                     });
//                 }
//             );
//         }
//     };
// }

// export function postArticleAPI(payload) {
//     return (dispatch) => {
//         dispatch(setLoading(true))
//         if (payload.image !== "") {
//             const upload = storage
//                 .ref(`images/${payload.image.name}`)
//                 .put(payload.image);
//             upload.on(
//                 "state_changed",
//                 (snapshot) => {
//                     const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
//                     console.log(`Progress: ${progress}%`);

//                     if (snapshot.state === "RUNNING") {
//                         console.log(`Progress: ${progress}%`);
//                     }
//                 },
//                 (error) => console.log(error.code),
//                 async () => {
//                     const downloadURL = await upload.snapshot.ref.getDownloadURL();
//                     const actorDate = payload.timeStamp || new Date(); // Check for valid timestamp or set to current date
//                     db.collection("articles")
//                         .add({
//                             actor: {
//                                 description: payload.user.email,
//                                 title: payload.user.displayName,
//                                 date: payload.timeStamp,
//                                 image: payload.user.photoURL,
//                             },
//                             video: payload.video,
//                             shareImg: downloadURL,
//                             comments: 0,
//                             description: payload.description,
//                         })
//                         .catch((error) => console.log(error));
//                     dispatch(setLoading(false));
//                 }
//             );
//         } else if (payload.video) {
//             const actorDate = payload.timeStamp || new Date(); // Check for valid timestamp or set to current date
//             db.collection("articles")
//                 .add({
//                     actor: {
//                         description: payload.user.email,
//                         title: payload.user.displayName,
//                         date: actorDate, // Use actorDate value
//                         image: payload.user.photoURL,
//                     },
//                     video: payload.video,
//                     shareImg: "",
//                     comments: 0,
//                     description: payload.description,
//                 })
//                 .catch((error) => console.log(error));
//             dispatch(setLoading(false));
//         }

//     };
// }

export function postArticleAPI(payload) {
    return async (dispatch) => {
        dispatch(setLoading(true));
        if (payload.image !== "") {
            const upload = storage
                .ref(`images/${payload.image.name}`)
                .put(payload.image);
            upload.on(
                "state_changed",
                (snapshot) => {
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log(`Progress: ${progress}%`);

                    if (snapshot.state === "RUNNING") {
                        console.log(`Progress: ${progress}%`);
                    }
                },
                (error) => console.log(error.code),
                async () => {
                    const downloadURL = await upload.snapshot.ref.getDownloadURL();
                    const actorDate = payload.timeStamp || new Date(); // Check for valid timestamp or set to current date
                    await db.collection("articles")
                        .add({
                            actor: {
                                description: payload.user.email,
                                title: payload.user.displayName,
                                date: actorDate, // Use actorDate value
                                image: payload.user.photoURL,
                            },
                            video: payload.video,
                            shareImg: downloadURL,
                            comments: 0,
                            description: payload.description,
                        })
                        .catch((error) => console.log(error));
                    dispatch(setLoading(false));
                }
            );
        } else if (payload.video) {
            const actorDate = payload.timeStamp || new Date(); // Check for valid timestamp or set to current date
            await db.collection("articles")
                .add({
                    actor: {
                        description: payload.user.email,
                        title: payload.user.displayName,
                        date: actorDate, // Use actorDate value
                        image: payload.user.photoURL,
                    },
                    video: payload.video,
                    shareImg: "",
                    comments: 0,
                    description: payload.description,
                })
                .catch((error) => console.log(error));
            dispatch(setLoading(false));
        }
    };
}


export function getArticleAPI() {
    return (dispatch) => {
        db.collection("articles")
        .orderBy("actor.date","desc")
        .onSnapshot((snapshot) => {
            const payload = snapshot.docs.map((doc) => doc.data());
            console.log(payload);
            // Dispatch an action with the payload
            dispatch( getArticles(payload) );
        });
    };
}
