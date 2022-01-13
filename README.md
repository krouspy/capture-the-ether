Solutions to [CaptureTheEther](https://capturetheether.com/), you can find an in-depth explanation on my [website](https://kenjilau.xyz/blog/034e627d-e839-4db7-aafe-52e4e8cbe534).

Challenges are deployed manually using the CTE interface that will give you your contract addresses. Solutions are in the `test/` folder, you can run them using `yarn test:ropsten` but it will target my own contracts on ropsten, I hardcoded the addresses for simplicity so make sure to replace them with your own addresses.

We use 2 accounts due to some challenges that requires an _accomplice_ so make sure to set your 2 private keys and your provider url in the `.env`

```
# .env
PROVIDER_URL=
PRIVATE_KEY=
PRIVATE_KEY_ACCOMPLICE=
```
