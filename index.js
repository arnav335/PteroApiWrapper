const axios = require('axios')
let apiKey = '';
let ServerID= ''
let PanelUrl = ''

function createheaderObject(){
    return {'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${apiKey}`
         }
}
function createclientObject() {
    return {'list':`${PanelUrl}/api/client`,
    'permissions':`${PanelUrl}/api/client/permissions`,
    'account': {
        'details': `${PanelUrl}/api/client/account`,
        'twofactor':{
            'details': `${PanelUrl}/api/client/account/two-factor`,
            'enable': `${PanelUrl}/api/client/account/two-factor`,
            'delete': `${PanelUrl}/api/client/account/two-factor`,
        },
        'apikeys':{
            list: `${PanelUrl}/api/client/account/api-keys`,
            create: `${PanelUrl}/api/client/account/api-keys`,
            'delete' : `${PanelUrl}/api/client/account/api-keys`
        },
        email: `${PanelUrl}/api/client/account/email`,
        password: `${PanelUrl}/api/client/account/password`,
    },
    'server': {
        control: {
            details: `${PanelUrl}/api/client/servers/${ServerID}`,
            websocket:`${PanelUrl}/api/client/servers/${ServerID}/websocket`,
            resources: `${PanelUrl}/api/client/servers/${ServerID}/resources`,
            command:   `${PanelUrl}/api/client/servers/${ServerID}/command`,
            power: `${PanelUrl}/api/client/servers/${ServerID}/power`
            
        },
        databases:`${PanelUrl}/api/client/servers/${ServerID}/databases`,
        fileManager:{
            list: `${PanelUrl}/api/client/servers/${ServerID}/files/list?directory=`,
            content: `${PanelUrl}/api/client/servers/${ServerID}/files/contents?file=`,
            rename:`${PanelUrl}/api/client/servers/${ServerID}/files/rename`,
            copy:`${PanelUrl}/api/client/servers/${ServerID}/files/copy`,
            write:`${PanelUrl}/api/client/servers/${ServerID}/files/write?file=`,
            compress:`${PanelUrl}/api/client/servers/${ServerID}/files/compress`,
            decompress:`${PanelUrl}/api/client/servers/${ServerID}/files/decompress`,
            delete:`${PanelUrl}/api/client/servers/${ServerID}/files/delete`,
            createFolder:`${PanelUrl}/api/client/servers/${ServerID}/files/create-folder`,
            upload:`${PanelUrl}/api/client/servers/${ServerID}/files/upload`
        },
        schedules: `${PanelUrl}/api/client/servers/${ServerID}/schedules`,
        allocations: `${PanelUrl}/api/client/servers/${ServerID}/allocations`,
        users: `${PanelUrl}/api/client/servers/${ServerID}/users`,
        backups: `${PanelUrl}/api/client/servers/${ServerID}/backups`,
        startup:{
            list: `${PanelUrl}/api/client/servers/${ServerID}/startup`,
            variable: `${PanelUrl}/api/client/servers/${ServerID}/startup/variable`
        },
        settings:{
            rename: `${PanelUrl}/api/client/servers/${ServerID}/settings/rename`,
            reinstall: `${PanelUrl}/api/client/servers/${ServerID}/settings/reinstall`
        }
    }
    }
}
function createApplicationObject() {
   return {
    'users': `${PanelUrl}/api/application/users`,
    'nodes': `${PanelUrl}/api/application/nodes`,
    'locations': `${PanelUrl}/api/application/locations`,
    'nests': `${PanelUrl}/api/application/nests`,
    'servers': `${PanelUrl}/api/application/servers`,
 }
}
async function getreq(path,work){
      const res = await axios.get(path,{headers: mymodule.header})
      let resp = res.data
      work(resp)
}    
async function postreq(path,body,work){
    const res = await axios.post(path,body,{headers: mymodule.header})
    let resp = res.data
    work(resp)
}    
async function deletereq(path,work){
    const res = await axios.delete(path,{headers: mymodule.header})
    work(res)
}
async function putreq(path,body,work){
    const res = await axios.put(path,body,{headers: mymodule.header})
    work(res)
}


  const wrapper = {
    application: null,
    header: null,
    client:  null,
    start: function(panelURL, apiKEY, ServerId) {
        PanelUrl = panelURL;
        apiKey = apiKEY;
        if (ServerId) {
            ServerID = ServerId;
        }

        wrapper.client = createclientObject();
        wrapper.header = createheaderObject();
        wrapper.application = createApplicationObject();

        return {
            get: getreq,
            put: putreq,
            delete: deletereq,
            post: postreq,
            client: wrapper.client,
            header: wrapper.header,
            application: wrapper.application
        };
    }
  }
  module.exports = wrapper;
