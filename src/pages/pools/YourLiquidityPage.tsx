import React, { useEffect, useState } from 'react';
import { Card } from '~components/card/Card';
import Alert from '~components/alert/Alert';
import { ConnectToNearBtn, GreenButton } from '~components/button/Button';
import Loading from '~components/layout/Loading';
import { wallet } from '~services/near';
import { useTokens } from '~state/token';
import { get_pools } from '~services/api';
import { toRoundedReadableNumber } from '~utils/numbers';
import { usePool } from '~state/pool';
import { RemoveLiquidityModal } from './DetailsPage';
import BN from 'bn.js';

function Empty() {
  return (
    <div>
      <div className="text-center font-semibold text-xs pb-1">
        You aren’t providing liquidity to any pools
      </div>
      <div className="flex items-center justify-center">
        {wallet.isSignedIn() ? (
          <div className="pt-2">
            <GreenButton>Add Liquidity</GreenButton>
          </div>
        ) : (
          <ConnectToNearBtn />
        )}
      </div>
    </div>
  );
}

export function YourLiquidityPage() {
  const [error, setError] = useState<Error>();
  const [pools, setPools] = useState([]);

  useEffect(() => {
    get_pools(0).then(setPools);
  }, []);

  return (
    <div className="flex items-center flex-col">
      <div className="text-center pb-8">
        <div className="text-white text-3xl font-semibold">Your Liquidity</div>
      </div>
      <div className="w-1/3 flex justify-center">
        {error && <Alert level="error" message={error.message} />}
      </div>
      <Card width="w-1/3">
        {!wallet.isSignedIn() || pools.length === 0 ? <Empty /> : null}
        {pools.length > 0 ? (
          <section>
            <div className="max-h-80 overflow-y-auto">
              {pools.map((pool, i) => (
                <PoolRow key={i} pool={pool} />
              ))}
            </div>
          </section>
        ) : null}
      </Card>
    </div>
  );
}

function PoolRow(props: { pool: any }) {
  const { pool } = usePool(props.pool.id);
  const tokens = useTokens(pool?.tokenIds);
  const [showWithdraw, setShowWithdraw] = useState(false);

  if (!pool || !tokens || tokens.length < 2) return <Loading />;

  tokens.sort((a, b) => {
    if (a.symbol === 'wNEAR') return 1;
    if (b.symbol === 'wNEAR') return -1;
    return a.symbol > b.symbol ? 1 : -1;
  });

  const images = tokens.map((token) => {
    const { icon, id } = token;
    if (icon) return <img key={id} className="h-6 w-6" src={icon} />;
    return <div key={id} className="h-6 w-6 rounded-full border"></div>;
  });

  return (props.pool.share > 0 &&
    <div className="grid grid-cols-12 py-2 content-center items-center text-xs font-semibold text-gray-600">
      <div className="grid grid-cols-2 col-span-2">
        <div className="w-14 flex items-center justify-between">{images}</div>
      </div>
      <p className="grid col-span-4">
        {tokens[0].symbol}-{tokens[1].symbol}
      </p>
      <p className="col-span-4 text-center">
        {toRoundedReadableNumber({ decimals: 24, number: Number(props.pool.share).toLocaleString('fullwide', {useGrouping:false}) })}
      </p>
      <div className="col-span-2 text-right">
        <GreenButton onClick={() => setShowWithdraw(true)}>Remove</GreenButton>
      </div>
      <RemoveLiquidityModal
        pool={pool}
        shares={Number(props.pool.share).toLocaleString('fullwide', {useGrouping:false})}
        tokens={tokens}
        isOpen={showWithdraw}
        onRequestClose={() => setShowWithdraw(false)}
      />
    </div>
  );
}
