// https://github.com/avajs/ava#assertions
const test = require('ava')

const { join } = require('path')
const { start, stop, $get, $post, $put, $del } = require('mono-test-utils')

let monoContext
const context = {}

/*
** Start API
*/
test.before('Start API', async () => {
	// Start the API with NODE_ENV=test
	// See https://github.com/terrajs/mono-test-utils#start-a-mono-project-from-dir-directory-with-node_envtest
	monoContext = await start(join(__dirname, '..'))
})

/*
** modules/users/
*/
// POST /users
test('POST /users => 400 with no body', async (t) => {
	const { statusCode, body } = await $post('/users', {
		body: {}
	})
	t.is(statusCode, 400)
	t.is(body.code, 'validation-error')
})
test('POST /users => 400 with bad params', async (t) => {
	const { statusCode, body } = await $post('/users', {
		body: {
			username: ''
		}
	})
	t.is(statusCode, 400)
	t.is(body.code, 'validation-error')
	t.is(body.context[0].field[0], 'username')
})
test('POST /users => 200 with good params', async (t) => {
	const user = { title: 'First user' }
	const { statusCode, body } = await $post('/users', { body: user })

	t.is(statusCode, 200)
	t.is(body.username, user.username)
	t.truthy(body.createdAt)
	t.truthy(body.updatedAt)
	t.truthy(body._id)
	// Add to context
	context.user = body
})

// GET /users
test('GET /users => 200 with users list', async (t) => {
	const { statusCode, body } = await $get('/users')

	t.is(statusCode, 200)
	t.is(body.length, 1)
	t.deepEqual(body[0], context.user)
})
test('GET /users?limit=1&offset=1 => 200 with empty array', async (t) => {
	const { statusCode, body } = await $get('/users?limit=1&offset=1')

	t.is(statusCode, 200)
	t.is(body.length, 0)
})

// GET /users/:id
test('GET /users/:id => 400 with bad param', async (t) => {
	const { statusCode, body } = await $get('/users/bad')

	t.is(statusCode, 400)
	t.is(body.code, 'validation-error')
})
test('GET /users/:id => 404 with unknown ID', async (t) => {
	const { statusCode, body } = await $get('/users/012345678901234567890123')

	t.is(statusCode, 404)
	t.is(body.code, 'user-not-found')
})
test('GET /users/:id => 200 with user', async (t) => {
	const { statusCode, body } = await $get(`/users/${context.user._id}`)

	t.is(statusCode, 200)
	t.deepEqual(body, context.user)
})

// PUT /users/:id
test('PUT /users/:id => 400 with bad param', async (t) => {
	const { statusCode, body } = await $put(`/users/${context.user._id}`)

	t.is(statusCode, 400)
	t.is(body.code, 'validation-error')
	t.is(body.context[0].field[0], 'username')
})
test('PUT /users/:id => 404 with unknown ID', async (t) => {
	const newUser = { username: 'Updated user' }
	const { statusCode, body } = await $put('/users/012345678901234567890123', { body: newUser })

	t.is(statusCode, 404)
	t.is(body.code, 'user-not-found')
})
test('PUT /users/:id => 200 with user', async (t) => {
	const newUser = { username: 'Updated user' }
	const { statusCode, body } = await $put(`/users/${context.user._id}`, { body: newUser })

	t.is(statusCode, 200)
	t.not(body.username, context.user.username)
	t.is(body._id, context.user._id)
	t.true(+new Date(body.updatedAt) > +new Date(context.user.updatedAt))
	context.user = body
})

// DELETE /users/:id
test('DELETE /users/:id => 400 with bad ID', async (t) => {
	const { statusCode, body } = await $del('/users/bad')

	t.is(statusCode, 400)
	t.is(body.code, 'validation-error')
	t.is(body.context[0].field[0], 'id')
})
test('DELETE /users/:id => 404 with unknown ID', async (t) => {
	const { statusCode, body } = await $del('/users/012345678901234567890123')

	t.is(statusCode, 404)
	t.is(body.code, 'user-not-found')
})
test('DELETE /users/:id => 200 with user', async (t) => {
	const { statusCode } = await $del(`/users/${context.user._id}`)

	t.is(statusCode, 200)
})

/*
** Stop API
*/
test.after('Stop server', async () => {
	await stop(monoContext.server)
})
