let roleList = [
    {id: 1, role: "ROLE_USER"},
    {id: 2, role: "ROLE_ADMIN"}
]
let isUser = true;

$(async function () {
    await getUser();
    await infoUser();
    await tittle();
    await getUsers();
    await getNewUserForm();
    await getDefaultModal();
    await createUser();

})

const userFetch = {
    head: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Referer': null
    },
    findAllUsers: async () => await fetch('api/get-all-users'),
    findUserByUsername: async () => await fetch(`api/get-current-user`),
    findOneUser: async (id) => await fetch(`api/get-user-by-id/${id}`),
    addNewUser: async (user) => await fetch('api/save', {
        method: 'POST',
        headers: userFetch.head,
        body: JSON.stringify(user)
    }),
    updateUser: async (user, id) => await fetch(`api/edit/${id}`, {
        method: 'POST',
        headers: userFetch.head,
        body: JSON.stringify(user)
    }),
    deleteUser: async (id) => await fetch(`api/delete/${id}`, {method: 'POST', headers: userFetch.head})
}

async function infoUser() {
    let temp = '';
    const info = document.querySelector('#info');
    await userFetch.findUserByUsername()
        .then(res => res.json())
        .then(user => {
            temp += `
             <span style="color: white; font-size: 20px">
               ${user.username} with roles <span>${user.roles.map(e => " " + e.role.substr(5))}</span>
                </div>
            </span>
                </tr>
            `;
        });
    info.innerHTML = temp;
}