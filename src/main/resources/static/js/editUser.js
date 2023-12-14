async function editUser(modal, id) {
    let oneUser = await userFetch.findOneUser(id);
    let user = oneUser.json();

    modal.find('.modal-title').html('Edit user');

    let editButton = `<button style="font-size: 20px;" class="btn btn-primary" id="editButton">Edit</button>`;
    let closeButton = `<button style="font-size: 20px;" type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>`
    modal.find('.modal-footer').append(editButton);
    modal.find('.modal-footer').append(closeButton);

    user.then(user => {
        let bodyForm = `
            <form class="form-group text-center" id="editUser">
               <div class="form-group">
                    <label style="font-size: 20px; font-weight: bold" for="userId" class="col-form-label">ID</label>
                    <input style="font-size: 20px;" type="text" class="form-control username" id="userId" value="${user.userId}" readonly>
               </div>
                   
               <div class="form-group">
                    <label style="font-size: 20px; font-weight: bold" for="username" class="col-form-label">Username</label>
                    <input style="font-size: 20px;" type="text" class="form-control username" id="username" value="${user.username}">
               </div>
               
                <div class="form-group">
                    <label style="font-size: 20px; font-weight: bold" for="age" class="com-form-label">Age</label>
                    <input style="font-size: 20px;" type="number" class="form-control" id="age" value="${user.age}">
                </div>
                

                <div class="form-group">
                    <label style="font-size: 20px; font-weight: bold" for="city" class="com-form-label">City</label>
                    <input style="font-size: 20px;" type="text" class="form-control" id="city" value="${user.city}">
                </div>

                <div class="form-group">
                    <label style="font-size: 20px; font-weight: bold" for="password" class="com-form-label">Password</label>
                    <input style="font-size: 20px;" type="password" class="form-control" id="password" value="${user.password}">
                </div>
                
                <div class="form-group">
                    <label style="font-size: 20px; font-weight: bold" for="roles" class="com-form-label">Roles</label>
                    <select multiple id="roles" size="2" class="form-control" style="max-height: 100px; text-align: center">
                    <option value="ROLE_USER">USER</option>
                    <option value="ROLE_ADMIN">ADMIN</option>
                    </select>
                </div>
            </form>
        `;
        modal.find('.modal-body').append(bodyForm);
    })

    $("#editButton").on('click', async () => {
        let checkedRoles = () => {
            let array = []
            let options = document.querySelector('#roles').options
            for (let i = 0; i < options.length; i++) {
                if (options[i].selected) {
                    array.push(roleList[i])
                }
            }
            return array;
        }
        let userId = modal.find("#userId").val().trim();
        let username = modal.find("#username").val().trim();
        let password = modal.find("#password").val().trim();
        let city = modal.find("#city").val().trim();
        let age = modal.find("#age").val().trim();
        let data = {
            userId: userId,
            username: username,
            password: password,
            city: city,
            age: age,
            roles: checkedRoles()

        }
        const response = await userFetch.updateUser(data, id);

        if (response.ok) {
            await getUsers();
            modal.modal('hide');
        } else {
            let body = await response.json();
            let alert = `<div class="alert alert-danger alert-dismissible fade show col-12" role="alert" id="messageError">
                            ${body.info}
                            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>`;
            modal.find('.modal-body').prepend(alert);
        }
    })
}