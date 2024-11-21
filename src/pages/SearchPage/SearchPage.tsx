import EventContainer from 'src/components/EventContainer'
import { useEvents } from '../../hooks/useEvents'
import { toast } from 'react-toastify'
import { useCallback, useEffect, useMemo, useState } from 'react'
import SearchIcon from 'src/assets/icons/i-search.svg?react'
import CloseIcon from 'src/assets/icons/i-close.svg?react'
import { debounce } from 'lodash'
import { DATE_TIME_FORMATS, TIMEOUT } from 'src/constants/common'
import SearchKey from 'src/assets/img/search.png'
import Loading from 'src/assets/icons/i-loading.svg?react'
import FilterPopover from 'src/components/FilterPopover'
import SearchFilter from './components'
import { EventTimeFilter } from 'src/types/event.type'
import moment from 'moment'

export default function SearchPage() {
  const [inputSearch, setInputSearch] = useState<string>('')
  const [debouncedSearch, setDebouncedSearch] = useState<string>('')
  const { events, isLoading, error } = useEvents()
  const [isSearching, setIsSearching] = useState<boolean>(false)
  const [eventFilterOptions, setEventFilterOptions] = useState<EventTimeFilter>({
    timeCreatedFrom: '',
    timeCreatedTo: ''
  })

  if (error) {
    toast.error(error.message)
    return
  }

  const hasFilter = useMemo(
    () => inputSearch || eventFilterOptions.timeCreatedFrom || eventFilterOptions.timeCreatedTo,
    [inputSearch, eventFilterOptions.timeCreatedFrom, eventFilterOptions.timeCreatedTo]
  )

  const filteredEvents = useMemo(() => {
    if (isSearching) {
      return []
    }
    const searchQuery = debouncedSearch.trim().toLowerCase()
    const { timeCreatedFrom, timeCreatedTo } = eventFilterOptions

    const hasTimeFilter = timeCreatedFrom || timeCreatedTo

    return events.filter(({ name, organizer, status }) => {
      const matchesSearch =
        name.toLowerCase().includes(searchQuery) || organizer?.name.toLowerCase().includes(searchQuery)

      const matchesTime =
        !hasTimeFilter ||
        ((!timeCreatedFrom || moment(status.moderatedAt).isSameOrAfter(moment(timeCreatedFrom))) &&
          (!timeCreatedTo || moment(status.moderatedAt).isSameOrBefore(moment(timeCreatedTo))))

      return matchesSearch && matchesTime
    })
  }, [events, debouncedSearch, isSearching, hasFilter])

  const handleSearchChange = useCallback(
    debounce((value: string) => {
      setDebouncedSearch(value)
    }, TIMEOUT.DEBOUNCE),
    []
  )

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setInputSearch(value)
    setIsSearching(true)
    handleSearchChange(value)
  }

  useEffect(() => {
    let timeoutId: NodeJS.Timeout | undefined

    if (!inputSearch) {
      setIsSearching(false)
      setDebouncedSearch('')
      if (timeoutId) {
        clearTimeout(timeoutId)
      }
      return
    }

    if (debouncedSearch) {
      timeoutId = setTimeout(() => {
        setIsSearching(false)
      }, TIMEOUT.DELAY)
    }

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId)
      }
    }
  }, [inputSearch, debouncedSearch])

  return (
    <div className='relative flex h-full w-full max-w-page flex-col items-center bg-neutral-1'>
      <header className='flex h-header-page items-center justify-between'>
        <div className='text-md font-semibold'>Tìm kiếm</div>
      </header>
      <main className='flex w-full flex-grow flex-col gap-4 rounded-xl border border-neutral-3 bg-neutral-0 p-6 shadow-sm'>
        <div className='w-full'>
          <div className='flex w-full items-center gap-2'>
            <div className='flex flex-1 items-center gap-2 rounded-lg border border-neutral-3 px-4 py-2'>
              <SearchIcon className='h-[20px] w-[20px]' />
              <input
                type='text'
                placeholder='Tìm kiếm sự kiện, tổ chức'
                className='flex-1 border-none text-sm text-neutral-7 outline-none placeholder:text-neutral-5'
                value={inputSearch}
                onChange={handleInputChange}
              />
              {inputSearch && (
                <div className='hover:cursor-pointer' onClick={() => setInputSearch('')}>
                  <CloseIcon className='h-[20px] w-[20px] opacity-70' />
                </div>
              )}
            </div>
            <FilterPopover
              content={(onClosePopover) => (
                <SearchFilter
                  onSendFilterOptions={setEventFilterOptions}
                  onClosePopover={onClosePopover}
                  filterValue={eventFilterOptions}
                />
              )}
            />
          </div>
          {hasFilter && (
            <div className='mt-2 text-xs text-neutral-7'>
              <span>
                Kết quả tìm kiếm
                {inputSearch && (
                  <span>
                    {' '}
                    chứa{' '}
                    <mark className='inline-flex min-h-fit items-center gap-1 rounded-lg bg-neutral-3 px-[6px] py-1 font-medium text-neutral-7'>
                      <span>{inputSearch}</span>
                      <CloseIcon className='inline-block cursor-pointer' onClick={() => setInputSearch('')} />
                    </mark>
                  </span>
                )}
              </span>
              {eventFilterOptions.timeCreatedFrom && (
                <span>
                  <span> từ </span>
                  <mark className='inline-flex min-h-fit items-center gap-1 rounded-lg bg-neutral-3 px-[6px] py-1 font-medium text-neutral-7'>
                    <span>{moment(eventFilterOptions.timeCreatedFrom).format(DATE_TIME_FORMATS.DATE_TIME_COMMON)}</span>
                    <CloseIcon
                      className='inline-block cursor-pointer'
                      onClick={() => setEventFilterOptions((prev) => ({ ...prev, timeCreatedFrom: '' }))}
                    />
                  </mark>
                </span>
              )}
              {eventFilterOptions.timeCreatedTo && (
                <span>
                  <span> đến </span>
                  <mark className='inline-flex min-h-fit items-center gap-1 rounded-lg bg-neutral-3 px-[6px] py-1 font-medium text-neutral-7'>
                    <span>{moment(eventFilterOptions.timeCreatedTo).format(DATE_TIME_FORMATS.DATE_TIME_COMMON)}</span>
                    <CloseIcon
                      className='inline-block cursor-pointer'
                      onClick={() => setEventFilterOptions((prev) => ({ ...prev, timeCreatedTo: '' }))}
                    />
                  </mark>
                </span>
              )}
            </div>
          )}
        </div>
        {isSearching && (
          <div className='flex w-full justify-center py-4'>
            <Loading className='h-[32px] w-[32px]' />
          </div>
        )}
        {!hasFilter && !isSearching && (
          <div className='flex w-full flex-col items-center gap-2'>
            <img src={SearchKey} alt='search key' className='h-[150px] w-[150px]' />
            <div className='text-sm text-neutral-5'>Nhập gì đó hoặc chọn ngày để tìm kiếm các sự kiện hay tổ chức</div>
          </div>
        )}
        {!isLoading && hasFilter && !isSearching && filteredEvents.length === 0 && (
          <div className='w-full py-4 text-center text-sm text-neutral-5'>Không có sự kiện nào</div>
        )}
        {!isLoading &&
          hasFilter &&
          !isSearching &&
          filteredEvents.length > 0 &&
          filteredEvents.map((event) => <EventContainer key={event.id} event={event} />)}
      </main>
    </div>
  )
}
