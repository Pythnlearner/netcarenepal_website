'use server'
import { handleServerFunctions } from '@payloadcms/next/layouts'
import config from '@/payload.config'
// @ts-ignore
import { importMap } from './admin/importMap'

export const serverFunction = async (args: any) => handleServerFunctions({
  ...args,
  config,
  importMap,
})
