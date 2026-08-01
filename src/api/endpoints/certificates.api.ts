import { apiClient } from '../client';
import { resolveApiAssetUrl } from '../url';
import type { Certificate } from '../../types/certificate.types';

export async function getCertificates(): Promise<Certificate[]> {
  const { data } = await apiClient.get<Certificate[]>('/Certificates');
  return data.map((certificate) => ({
    ...certificate,
    certificateUrl: resolveApiAssetUrl(certificate.certificateUrl),
  }));
}
