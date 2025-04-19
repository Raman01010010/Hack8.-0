import { ethers } from 'ethers';
import EntitiesABI from './EntitiesABI.json';
import { entitiesAddress } from './contractAddress';

const getContract = () => {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  return new ethers.Contract(entitiesAddress, EntitiesABI, signer);
};

// Investor functions
export const addInvestor = async (name, wallet) => {
  const contract = getContract();
  const tx = await contract.addInvestor(name, wallet);
  await tx.wait();
};
export const getInvestor = async (id) => {
  const contract = getContract();
  return await contract.getInvestor(id);
};
export const getInvestorCount = async () => {
  const contract = getContract();
  return (await contract.getInvestorCount()).toNumber();
};

// Startup functions
export const addStartup = async (name, owner) => {
  const contract = getContract();
  const tx = await contract.addStartup(name, owner);
  await tx.wait();
};
export const getStartup = async (id) => {
  const contract = getContract();
  return await contract.getStartup(id);
};
export const getStartupCount = async () => {
  const contract = getContract();
  return (await contract.getStartupCount()).toNumber();
};

// Document functions
export const addDocument = async (uri) => {
  const contract = getContract();
  const tx = await contract.addDocument(uri);
  await tx.wait();
};
export const getDocument = async (id) => {
  const contract = getContract();
  return await contract.getDocument(id);
};
export const getDocumentCount = async () => {
  const contract = getContract();
  return (await contract.getDocumentCount()).toNumber();
};