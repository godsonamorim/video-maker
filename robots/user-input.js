content.searchterm = askAndReturnSearchTerm()
	content.prefix = askAndReturnPrefix()
function askAndReturnSearchTerm(){
		return readline.question('Digite o termo de busca no Wikipedia:')
	}

	function askAndReturnPrefix(){
		const prefixes = ['Who is','What is', 'The history of']
		const selectedPrefixIndex = readline.keyInSelect(prefixes, 'Escolha uma opção')
		const selectedPrefixText = prefixes[selectedPrefixIndex]
		return selectedPrefixText
	}
