
const readline = require('readline-sync')
const robots = {
	text: require('./robots/text.js')
}

async function start(){
	const content = {}

	content.searchTerm = askAndReturnSearchTerm()
	content.prefix = askAndReturnPrefix()


	await robots.text(content)

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