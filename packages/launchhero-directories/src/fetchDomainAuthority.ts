import 'dotenv/config'

const endpointUrl = 'https://api.moz.com/jsonrpc'

// Replace YOUR_TOKEN_HERE with your actual API token copied from the Moz API dashboard
const apiToken = process.env.MOZ_API_KEY!

async function fetchDomainAuthority(domain: string) {
  // Sample payload for a request that won't use any quota:
  const requestBody = {
    jsonrpc: '2.0',
    id: 'ca251c24-282c-4ba8-897c-236221a4e38a',
    method: 'data.site.metrics.fetch',
    params: {
      data: {
        site_query: {
          query: domain,
          scope: 'domain',
        },
      },
    },
  }

  // Define the request options including headers
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-moz-token': apiToken,
    },
    body: JSON.stringify(requestBody),
  }

  // Send the POST request
  try {
    const response = await fetch(endpointUrl, requestOptions)
    const data = await response.json()

    return data?.result?.site_metrics?.domain_authority ?? 0
  }
  catch (error) {
    console.error('❌ Error fetching domain authority for', domain, error)

    return 0
  }
}

export default fetchDomainAuthority
