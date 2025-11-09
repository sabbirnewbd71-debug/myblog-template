// app.js - type=module
const user = auth.currentUser; if(!user) return alert('Login first');
const text = document.getElementById('postText').value.trim();
const file = document.getElementById('postImage').files[0];
let imgURL = '';
if(file){
const path = `posts/${user.uid}/${Date.now()}_${file.name}`;
const ref = sref(storage,path);
await uploadBytes(ref,file);
imgURL = await getDownloadURL(ref);
}
await addDoc(collection(db,'posts'),{
uid: user.uid,
author: user.displayName || 'Anonymous',
text,
img: imgURL,
createdAt: Date.now(),
likes: [],
comments: []
});
document.getElementById('postText').value='';
document.getElementById('postImage').value='';
});


// Feed listener
let unsubFeed = null;
function startFeedListener(){
if(unsubFeed) unsubFeed();
const q = query(collection(db,'posts'), orderBy('createdAt','desc'));
unsubFeed = onSnapshot(q, snap=>{
feedList.innerHTML='';
snap.forEach(docSnap=>{
const p = docSnap.data();
const id = docSnap.id;
const el = renderPost(id,p);
feedList.appendChild(el);
});
});
}


function renderPost(id, p){
const wrap = document.createElement('div'); wrap.className='card post';
const meta = document.createElement('div'); meta.className='meta';
const avatar = document.createElement('img'); avatar.src = `https://avatars.dicebear.com/api/initials/${encodeURIComponent(p.author)}.svg`;
meta.appendChild(avatar);
const name = document.createElement('div'); name.innerHTML = `<strong>${escapeHtml(p.author)}</strong> <div style="color:var(--muted);font-size:12px">${new Date(p.createdAt).toLocaleString()}</div>`;
meta.appendChild(name);
wrap.appendChild(meta);
const body = document.createElement('div'); body.className='body';
if(p.text) body.innerHTML += `<div>${escapeHtml(p.text)}</div>`;
if(p.img) body.innerHTML += `<div style="margin-top:8px"><img src="${p.img}" style="max-width:100%;border-radius:8px"></div>`;
const actions = document.createElement('div'); actions.className='actions';
const likeBtn = document.createElement('button'); likeBtn.textContent = `Like (${(p.likes||[]).length})`;
likeBtn.onclick = async ()=>{
const user = auth.currentUser; if(!user) return alert('Login first');
const docRef = doc(db,'posts',id);
await updateDoc(docRef,{likes: arrayUnion(user.uid)});
};
const commentBtn = document.createElement('button'); commentBtn.textContent = `Comment (${(p.comments||[]).length})`;
commentBtn.onclick =
