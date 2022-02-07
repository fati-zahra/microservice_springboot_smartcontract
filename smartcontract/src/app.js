var Web3 = require('web3')
App = {
    loading: false,
    contracts: {},
    load: async () => {
        await App.loadWeb3()
        await App.loadAccount()
        await App.loadContract()
        await App.render()
    },

  // https://medium.com/metamask/https-medium-com-metamask-breaking-change-injecting-web3-7722797916a8
    loadWeb3: async () => {
        if (typeof web3 !== 'undefined') {
        App.web3Provider = web3.currentProvider
        web3 = new Web3(web3.currentProvider)
        } else {
        window.alert("Please connect to Metamask.")
        }
        // Modern dapp browsers...
        if (window.ethereum) {
        window.web3 = new Web3(ethereum)
        try {
            // Request account access if needed
            await ethereum.enable()
            // Acccounts now exposed
            web3.eth.sendTransaction({/* ... */})
        } catch (error) {
            // User denied account access...
        }
        }
        // Legacy dapp browsers...
        else if (window.web3) {
        App.web3Provider = web3.currentProvider
        window.web3 = new Web3(web3.currentProvider)
        // Acccounts always exposed
        web3.eth.sendTransaction({/* ... */})
        }
        // Non-dapp browsers...
        else {
        console.log('Non-Ethereum browser detected. You should consider trying MetaMask!')
        }
    },  
  

    loadAccount: async () => {
        // Set the current blockchain account
        App.account = web3.currentProvider._state.accounts[0]
    },

    loadContract: async () => {
        // Create a JavaScript version of the smart contract
        const contrat = await $.getJSON('contrat.json')
        App.contracts.contrat = TruffleContract(contrat)
        App.contracts.contrat.setProvider(App.web3Provider)
        // asigns the correct address to the provider
        App.contracts.contrat.defaults({from: web3.eth.coinbase});
        // Hydrate the smart contract with values from the blockchain
        App.contrat = await App.contracts.contrat.deployed()

    },

    render: async () => {
        if (App.loading){
            return
        }
        App.setLoading(true)

        $('#account').html(App.account)

        await App.renderTasks()

        App.setLoading(false)
    },
    renderTasks: async () => {
        // Load the total task count from the blockchain
        const taskCount = await App.contrat.taskCount()
        const $taskTemplate = $('.taskTemplate')
    
        // Render out each task with a new task template
        for (var i = 1; i <= taskCount; i++) {
          // Fetch the task data from the blockchain
          const task = await App.contrat.tasks(i)
          const taskId = task[0].toNumber()
          const tasktype_immoblier = task[1]
          const taskbuyer = task[2]
          const taskseller = task[3]
          const tasprice = task[4]
          //const dates = task[5]
          const formatDate = (dates) => {
            if (!dates.e) { return '' }
            const _date = new Date(dates.toNumber());
            const date = `${_date.getDate() + 1}/${_date.getMonth() + 1}/${_date.getFullYear()}`;
            const time = `${_date.getHours()}h ${_date.getMinutes()}m`; return `${date} - ${time}`;
          };
          const tasdate =formatDate(task[5])

          const taskCompleted = task[6]
    
          // Create the html for the task
          const $newTaskTemplate = $taskTemplate.clone()
          $newTaskTemplate.find('.id').html(taskId)
          $newTaskTemplate.find('.type_immoblier').html(tasktype_immoblier)
          $newTaskTemplate.find('.buyer').html(taskbuyer)
          $newTaskTemplate.find('.seller').html(taskseller)
          $newTaskTemplate.find('.price').html(tasprice)
          $newTaskTemplate.find('.date').html(tasdate)

         // $newTaskTemplate.find('input')
                         // .prop('name', taskId)
                          //.prop('checked', taskCompleted)
                          //.on('click', App.toggleCompleted)
    
          // Put the task in the correct list
          if (taskCompleted) {
            $('#completedTaskList').append($newTaskTemplate)
          } else {
            $('#taskList').append($newTaskTemplate)
          }
    
          // Show the task
          $newTaskTemplate.show()
        }
      },
    createTask: async () => {
        App.setLoading(true)
       // const taskId = $('#newTask').val()
        const tasktype_immoblier = $('#newTask').val()
        const taskbuyer = $('#newTask1').val()
        const taskseller = $('#newTask2').val()
        const tasprice = $('#newTask3').val()


        await App.contrat.createTask(tasktype_immoblier, taskbuyer, taskseller, tasprice)
        window.location.reload()
    },
    toggleCompleted: async (e) =>{
        App.setLoading(true);
        const taskId = e.target.name
        await App.contrat.toggleCompleted(taskId);
        window.location.reload()
    },
    setLoading: (boolean) => {
        App.loading = boolean
        const loader = $('#loader')
        const content = $('#content')
        //const nom = $('#nom')

        if (boolean) {
            loader.show()
            content.hide()
           // nom.hide()

        } else {
            loader.hide()
            content.show()
            //nom.show()

        }

      
          
    },
}

$(() => {
    $(window).load(()=> {
        App.load()
    })
})