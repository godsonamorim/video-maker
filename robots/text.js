const algorithmia = require('algorithmia')
const algorithmiaApiKey = require('../credentials/algorithmia.json').apiKey
const sentenceBoundaryDetection = require('sbd')


async function robot(content){
 	
 	await fetchContentFromWikipedia(content)
 	sanitizeContent(content)
 	breakContentIntoSentences(content)

 	async function fetchContentFromWikipedia(content){
 		const algorithmiaAuthenticated = algorithmia(algorithmiaApiKey )
 		const wikipediaAlgorithmia = algorithmiaAuthenticated.algo("web/WikipediaParser/0.1.2")
 		const wikipediaResponse =  await wikipediaAlgorithmia.pipe(content.searchTerm)
 		const wikipediaContent = wikipediaResponse.get()

 		content.sourceContentOriginal = wikipediaContent.content

 		//console.log(wikipediaContent)
 	}

 	function sanitizeContent(content){
 		const withoutBlankLinesAndMarkDown = removeBlankLinesAndMarkDown(content.sourceContentOriginal)
 		const withoutDatesInParentheses = removeDatesInParentheses(withoutBlankLinesAndMarkDown)
 		
 		content.sourceContentSanitized = withoutDatesInParentheses
 		

 		function removeBlankLinesAndMarkDown(text){
 			const allLines = text.split('\n')

 			const withoutBlankLinesAndMarkDown = allLines.filter((line) => {
        		if (line.trim().length === 0 || line.trim().startsWith('=')) {
         			 return false
 				}
 				return true
 			})

 			return withoutBlankLinesAndMarkDown.join(' ')
 		}
 	}

 	function removeDatesInParentheses(text){
 		return text.replace(/\((?:\([^()]*\)|[^()])*\)/gm, '').replace(/  /g,' ')
 	}

 	function breakContentIntoSentences(content){
 		content.sentences = []
 		const sentences = sentenceBoundaryDetection.sentences(content.sourceContentSanitized)
 		sentences.forEach((sentence)=>{
 			content.sentences.push({
 				text: sentence,
 				keywords: [],
 				images: []
 			})
 		})
 	}
}

module.exports = robot