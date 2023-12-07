import axios from 'axios'

export type CodeFileRequest = {
  title: string
  url: URL
}

export type CodeFile = {
  title: string
  code: string[]
}

export const getCodeFile = async ({
  url,
  title,
}: CodeFileRequest): Promise<CodeFile> => {
  return axios.get(url.toString()).then((response) => {
    return {
      title,
      code: response.data.split('\n'),
    }
  })
}
