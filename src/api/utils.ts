export const timeout = (ms: number) =>
  new Promise(resolve => setTimeout(resolve, ms));

const matchesFilter = (evt: any, filter: object) =>
  !Object.keys(filter).find(key => evt.returnValues[key] !== filter[key]);

export async function pollForEvents(
  contract: any,
  eventName: string,
  filter = {},
  fromBlock: number
) {
  let events: object[] = [];
  while (events.length === 0) {
    events = await contract.getPastEvents(eventName, {
      filter,
      fromBlock,
      toBlock: 'latest'
    });
    events = events.filter(evt => matchesFilter(evt, filter));
    await timeout(2e3);
  }
  return events;
}

export async function waitForEvent({
  contract,
  eventName,
  filter,
  fromBlock,
  timeoutMs = 60e3
}: any) {
  const res: any = await Promise.race([
    pollForEvents(contract, eventName, filter, fromBlock),
    timeout(timeoutMs)
  ]);
  if (typeof res !== 'object') {
    throw new Error('event polling timeout');
  } else {
    return res[res.length - 1];
  }
}

export async function loadContract(name: string, web3: any, address: string) {
  const req = await fetch(
    `https://raw.githubusercontent.com/JodusNodus/erc20-bridge/master/build/contracts/${name}.json`
  );
  if (!req.ok) {
    throw new Error();
  }
  const resp = await req.json();
  if (!resp.abi) {
    throw new Error();
  }
  const contract = await new web3.eth.Contract(resp.abi, address);
  return contract;
}

export async function collectSignatures(
  bridge: object,
  fromBlock: number,
  transactionHash: string
) {
  const filter = { _transactionHash: transactionHash };

  const events = await pollForEvents(
    bridge,
    'WithdrawRequestSigned',
    filter,
    fromBlock
  );

  const signatures = new Map();
  events.forEach(({ returnValues }: any) => {
    signatures.set(returnValues._signer, returnValues);
  });

  const v: string[] = [];
  const r: string[] = [];
  const s: string[] = [];
  let withdrawBlock;

  signatures.forEach(signature => {
    withdrawBlock = signature._withdrawBlock;
    v.push(signature._v);
    r.push(signature._r);
    s.push(signature._s);
  });

  return { v, r, s, withdrawBlock };
}
