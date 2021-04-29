const BASEURL = "https://assets.breatheco.de/apis/fake/contact/";
const NOMBRE_AGENDA = "miguel999";

const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			//Your data structures, A.K.A Entities
		},
		actions: {
			//(Arrow) Functions that update the Store
			// Remember to use the scope: scope.state.store & scope.setState()
			loadInitialContacts: async function() {
				try {
					//console.log(BASEURL);
					let response = await fetch(BASEURL + "agenda/" + NOMBRE_AGENDA);
					console.log(response);
					if (response.ok) {
						// let contacts = await JSON.parse(response.body);
						let contacts = await response.json();
						setStore({
							contacts: contacts
						});
					} else {
						throw new Error("API No encontrada");
						//console.log();
					}
				} catch (error) {
					console.log(error);
				}
				//setStore
				//return response;
			},
			createContact: async ({ fullName, email, address, phone }) => {
				const actions = getActions();
				try {
					let response = await fetch(BASEURL, {
						method: "POST",
						headers: {
							"Content-Type": "application/json"
						},
						body: JSON.stringify({
							full_name: fullName,
							email: email,
							agenda_slug: NOMBRE_AGENDA,
							address: address,
							phone: phone
						})
					});
					if (response.ok) {
						await actions.loadInitialContacts();
						return true;
					} else {
						throw new Error("Error al Crear Contacto");
					}
				} catch (error) {
					console.log(error);
					return false;
				}
			},
			getContact: () => {},
			updateContact: () => {},
			deleteContact: () => {}
			//GET: /apis/fake/contact/{contact_id}
			//DELETE: /apis/fake/contact/{contact_id}
		}
	};
};

export default getState;
