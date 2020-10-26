






test('allows user to log in', async () => {
    render(<Login />)
    userEvent.type(
        screen.getByRole('textbox', { name: /username/i }),
        'john.maverick',
    )
    userEvent.type(
        screen.getByRole('textbox', { name: /password/i }),
        'super-secret',
    )
    userEvent.click(screen.getByText(/submit/i))
    const alert = await screen.findByRole('alert')
})