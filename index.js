
const readline = require('readline-sync')

function start(){
	const content = {}

	content.searchterm = askAndReturnSearchTerm()
	content.prefix = askAndReturnPrefix()

	function askAndReturnSearchTerm(){
		return readline.question('Digite o termo de busca no Wikipedia:')
	}

	function askAndReturnPrefix(){
		const prefixes = ['Quem é','O que ', 'A história de']
		const selectedPrefixIndex = readline.keyInSelect(prefixes, 'Escolha uma opção')
		const selectedPrefixText = prefixes[selectedPrefixIndex]
		return selectedPrefixText
	}

	console.log(content)
}

start()